'use client';

import { useState } from 'react';
import { useJobs, JOB_STAGES, STAGE_NAMES } from '@/lib/context/JobContext';
import Header from '@/components/layout/Header';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import { KanbanItem } from '@/components/kanban/KanbanItem';

export default function KanbanPage() {
  const { jobs, loading, addJob, updateJobStage, deleteJob } = useJobs();
  const [newJobForm, setNewJobForm] = useState({
    company: '',
    position: '',
    link: '',
    notes: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // הגדרת חיישנים לגרירה
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // טיפול באירוע תחילת גרירה
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // טיפול באירוע סיום גרירה
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // אם נגרר לעמודה אחרת
    if (active.id !== over.id) {
      // מעדכן את שלב המשרה לפי העמודה החדשה
      const jobId = active.id;
      const newStage = over.id.replace('column-', '');
      
      updateJobStage(jobId, newStage);
    }
  };

  const handleFormChange = (e) => {
    setNewJobForm({
      ...newJobForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    addJob({
      ...newJobForm,
      stage: JOB_STAGES.APPLIED
    });
    setNewJobForm({
      company: '',
      position: '',
      link: '',
      notes: '',
    });
    setIsFormOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">טוען...</div>;
  }

  // מצא את המשרה הפעילה כרגע
  const activeJob = activeId ? jobs.find(job => job.id === activeId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">לוח מעקב משרות</h1>
          
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {isFormOpen ? 'סגור טופס' : 'הוסף משרה חדשה'}
          </button>
        </div>
        
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">הוספת משרה חדשה</h2>
            <form onSubmit={handleAddJob}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">חברה</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">תפקיד</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">קישור למשרה</label>
                <input
                  type="url"
                  name="link"
                  value={newJobForm.link}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">הערות</label>
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
                שמור משרה
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Object.values(JOB_STAGES).map(stage => (
              <KanbanColumn
                key={stage}
                id={`column-${stage}`}
                title={STAGE_NAMES[stage]}
                count={jobs.filter(job => job.stage === stage).length}
              >
                {jobs
                  .filter(job => job.stage === stage)
                  .map((job) => (
                    <KanbanItem 
                      key={job.id} 
                      id={job.id} 
                      job={job} 
                      onDelete={() => deleteJob(job.id)} 
                    />
                  ))}
              </KanbanColumn>
            ))}
          </div>
          
          <DragOverlay>
            {activeId && activeJob ? (
              <div className="bg-white p-3 rounded-md shadow border-r-4 border-blue-500 opacity-90">
                <div className="font-medium text-gray-800">{activeJob.company}</div>
                <div className="text-sm text-gray-600">{activeJob.position}</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
} 