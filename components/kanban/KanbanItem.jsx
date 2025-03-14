'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function KanbanItem({ id, job, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md shadow mb-2 border-r-4 border-blue-500 cursor-grab"
    >
      <div className="font-medium text-gray-800">{job.company}</div>
      <div className="text-sm text-gray-600">{job.position}</div>
      {job.link && (
        <a 
          href={job.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline mt-1 block truncate"
        >
          קישור למשרה
        </a>
      )}
      <div className="flex justify-end mt-2">
        <button
          onClick={onDelete}
          className="text-xs text-red-600 hover:text-red-800"
        >
          מחק
        </button>
      </div>
    </div>
  );
} 