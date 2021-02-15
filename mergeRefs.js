import React from 'react';

export function mergeRefs(...refs){
  const filteredRefs = refs.filter(Boolean);
  return React.useMemo(() => {
    if(!filteredRefs.length) return null;  
    return (node) => {
      filteredRefs.forEach(ref => {
        if(ref) assignRef(ref, node);
      });
    }
  }, filteredRefs)
}

function assignRef(ref, value){
  if(ref == null) return;
  
  if(typeof ref === 'function'){
    ref(value);
    return;
  }
  
  try{
    ref.current = value;
  }catch(error){
    throw new Error(`Cannot assign value ${value} to ref ${ref}`);
  }
}