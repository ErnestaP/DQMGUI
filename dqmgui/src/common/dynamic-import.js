
import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Loadable from 'react-loadable';

const loading = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      opacity: 0.8,
      position: 'absolute',
    }}
  >
    <CircularProgress />
  </div>
);

// Dynamic import with react-loadable
export default function dynamicImport(loader) {
  return Loadable({
    loader,
    loading,
  });
}