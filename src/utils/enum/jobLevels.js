export const jobLevels = {
  allLevels: 'All levels',
  entryLevel: 'Entry-level (0-1 years)',
  midLevel: 'Mid-level (2-4 years)',
  seniorLevel: 'Senior-level (5+ years)',
};

export const convertJobLevel = (min_years_experience) => {
  if (min_years_experience === null) return null;
  if (min_years_experience <= 1) {
    return 'Entry-Level';
  } else if (min_years_experience > 1 && min_years_experience <= 4) {
    return 'Mid-Level';
  } else if (min_years_experience > 4) {
    return 'Senior-Level';
  } else {
    return null;
  }
};