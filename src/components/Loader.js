import React from 'react';

function Loader() {
  return(
          <div class="d-flex justify-content-center loader">
            <div class="spinner-border text-success" role="status">
                <span class="sr-only"></span>
            </div>
         </div>
  );
}

export default Loader;
