
const findClrMatch = (skill, clr) => {
  console.log('looking for skill', skill)
  const clrMatch = clr.find((s) => s.achievement.id.includes(skill.name));
  return clrMatch;
}

export default findClrMatch;