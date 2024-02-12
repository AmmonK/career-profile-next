import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'

const QueryModifications = () => {
  const queryClient = useQueryClient()

  const handleReset = () => {
    queryClient.resetQueries({ queryKey: ['clr'] })
    // Handle button click event here
    console.log('clr reset');
  };

  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['clr'] })
    // Handle button click event here
    console.log('clr invalidated');
  };

  const handleRefetch = () => {
    queryClient.refetchQueries({ queryKey: ['clr'] })
    // Handle button click event here
    console.log('clr refetched');
  };





  return (
    <div>
      <button onClick={handleReset}>Reset CLR</button>
      <button onClick={handleInvalidate}>Invalidate CLR</button>
      <button onClick={handleRefetch}>Refetch CLR</button>
    </div>
  );
};

export default QueryModifications;
