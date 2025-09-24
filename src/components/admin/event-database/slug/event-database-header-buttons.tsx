import { Button } from '@/components/ui/button';
import { useDatabaseStore } from '@/stores/admin/databaseStore';
import { Plus } from 'lucide-react';
import React from 'react'

function EventDatabaseHeaderButtons() {
    const { setAddValidationColumn, setAddResponse } = useDatabaseStore((state) => state);

    return (
      <div className="flex items-center justify-end gap-4">
        <Button onClick={setAddValidationColumn} variant="outline" size="sm">
          <Plus />
          <span className="hidden lg:inline">Add Validation Column</span>
        </Button>
        <Button onClick={setAddResponse} variant="outline" size="sm">
          <Plus />
          <span className="hidden lg:inline">Add Response Data</span>
        </Button>
      </div>
    );
}

export default EventDatabaseHeaderButtons