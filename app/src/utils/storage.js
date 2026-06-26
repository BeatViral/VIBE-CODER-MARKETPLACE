const STORAGE_KEY = 'vibestudio.phase1.projects';

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function loadProjects() {
  if (!canUseStorage()) return [];

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function loadProject(projectId) {
  return loadProjects().find((project) => project.id === projectId) || null;
}

export function saveProject(project) {
  if (!canUseStorage()) return project;

  const now = new Date().toISOString();
  const existing = loadProjects();
  const nextProject = {
    ...project,
    id: project.id || `vs-${Date.now()}`,
    createdAt: project.createdAt || now,
    updatedAt: now,
  };
  const next = [nextProject, ...existing.filter((item) => item.id !== nextProject.id)];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return nextProject;
}

export function deleteProject(projectId) {
  if (!canUseStorage()) return [];

  const next = loadProjects().filter((project) => project.id !== projectId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function duplicateProject(projectId) {
  const project = loadProject(projectId);
  if (!project) return null;

  const duplicate = {
    ...project,
    id: `vs-${Date.now()}`,
    name: `${project.name || project.formData?.projectName || 'Untitled'} copy`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return saveProject(duplicate);
}
