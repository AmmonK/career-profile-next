import React from 'react';
import useSocCodesByProgramCode from '@/hooks/swr/useSocCodesByProgramCode';

const SocCodes = ({ socCode }) => {
  const { socCodes: socCodes, isLoading: isLoadingSocCodes } =
    useSocCodesByProgramCode(socCode);

  return (
    <div>
      <h1>soc info</h1>
      {isLoadingSocCodes && <div>Loading soc codes...</div>}
      {!isLoadingSocCodes && (
        <div>
          {socCodes.map((socCode) => {
            return socCode.socCodes.map((soc) => {
              return <div key={soc.socCode}>{soc.socCode} | {soc.socTitle}</div>;
            });
          })}
        </div>
      )}
    </div>
  );
};

export default SocCodes;
