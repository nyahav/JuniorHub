'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import { KanbanItem } from '@/components/kanban/KanbanItem';
import { supabase } from '@/lib/supabase';

// Define JOB_STAGES and STAGE_NAMES directly in the component or a constants file
const JOB_STAGES = {
  APPLIED: 'applied',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected',
};

const STAGE_NAMES = {
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};

interface JobFormData {
  company: string;
  position: string;
  link: string;
  notes: string;
}

interface Job extends JobFormData {
  id: string;
  stage: string;
}

export default function KanbanPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newJobForm, setNewJobForm] = useState<JobFormData>({
    company: '',
    position: '',
    link: '',
    notes: '',
  });
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch jobs from Supabase
  const loadJobs = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      
      // Handle empty data case
      if (!data || data.length === 0) {
        setJobs([]); // Set empty array instead of null
        return; // Return early but don't show error
      }
  
      setJobs(data as Job[]);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setErrorMessage('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end event
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dragged to a different column
    if (active.id !== over.id) {
      const jobId = active.id as string;
      const newStage = (over.id as string).replace('column-', '');
      await updateJobStage(jobId, newStage);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewJobForm({
      ...newJobForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    const newJob = { ...newJobForm, stage: JOB_STAGES.APPLIED };

    const { data, error } = await supabase.from('jobs').insert([newJob]).select().single();
    if (error) {
      setErrorMessage('Error adding job');
      console.error('Error adding job:', error);
      return;
    }

    setJobs([...(jobs || []), data as Job]);
    setNewJobForm({
      company: '',
      position: '',
      link: '',
      notes: '',
    });
    setIsFormOpen(false);
    setSuccessMessage('Job added successfully!');
  };

  const updateJobStage = async (jobId: string, newStage: string) => {
    const { error } = await supabase.from('jobs').update({ stage: newStage }).eq('id', jobId);
    if (error) {
      setErrorMessage('Error updating job stage');
      console.error('Error updating job stage:', error);
      return;
    }
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, stage: newStage } : job
      )
    );
  };

  const deleteJob = async (jobId: string) => {
    const { error } = await supabase.from('jobs').delete().eq('id', jobId);
    if (error) {
      setErrorMessage('Error deleting job');
      console.error('Error deleting job:', error);
      return;
    }
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Job Tracking Board</h1>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Add Your First Job
            </button>
          </div>

          {isFormOpen ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
              <form onSubmit={handleAddJob}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newJobForm.company}
                      onChange={handleFormChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={newJobForm.position}
                      onChange={handleFormChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Link</label>
                  <input
                    type="url"
                    name="link"
                    value={newJobForm.link}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={newJobForm.notes}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                >
                  Save Job
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600 mb-4">No jobs added yet</h2>
              <p className="text-gray-500">Click the button above to start tracking your job applications</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Find currently active job
  const activeJob = activeId ? jobs.find((job) => job.id === activeId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Job Tracking Board</h1>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {isFormOpen ? 'Close Form' : 'Add New Job'}
          </button>
        </div>

        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
            <form onSubmit={handleAddJob}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={newJobForm.company}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={newJobForm.position}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Link</label>
                <input
                  type="url"
                  name="link"
                  value={newJobForm.link}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newJobForm.notes}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Save Job
              </button>
            </form>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(JOB_STAGES).map((stage) => {
              // Cast `stage` to a key of `STAGE_NAMES`
              const stageJobs = jobs.filter((job) => job.stage === stage as keyof typeof STAGE_NAMES);
              return (
                <KanbanColumn
                  key={stage}
                  id={`column-${stage}`}
                  title={STAGE_NAMES[stage as keyof typeof STAGE_NAMES]} // Safe indexing after casting
                  count={stageJobs.length}
                >
                  {stageJobs.map((job) => (
                    <KanbanItem
                      key={job.id}
                      id={job.id}
                      job={job}
                      onDelete={() => deleteJob(job.id)}
                    />
                  ))}
                </KanbanColumn>
              );
            })}
          </div>

          <DragOverlay>
            {activeId && activeJob ? (
              <KanbanItem
                id={activeId}
                job={activeJob}
                onDelete={() => deleteJob(activeId)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

      </main>
    </div>
  );
}