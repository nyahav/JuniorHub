'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export function KanbanColumn({ id, title, count, children }) {
  const { setNodeRef } = useDroppable({ id });
  
  // מציאת ה-IDs של כל הפריטים בעמודה
  const itemIds = React.Children.map(children, child => child?.props?.id) || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <h3 className="p-3 bg-gray-800 text-white font-medium text-center">
        {title}
        <span className="ml-2 bg-gray-700 text-xs py-1 px-2 rounded-full">
          {count}
        </span>
      </h3>
      
      <div
        ref={setNodeRef}
        className="flex-grow p-2 min-h-[150px] bg-gray-50"
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </div>
    </div>
  );
} 