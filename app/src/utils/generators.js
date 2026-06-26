import { generateFileTree, generateProjectFiles, getGeneratedPageNames, splitList, toFolderName, toProjectName } from './projectFiles.js';

function fallback(value, text) {
  return value?.trim?.() ? value.trim() : text;
}

function listOrFallback(value, items) {
  const list = splitList(value);
  return list.length ? list : items;
}

export function generateWorkflowMap(formData) {
  const pages = getGeneratedPageNames(formData).map((page) => page.replace('.jsx', ''));

  return [
    ['Project summary', `${toProjectName(formData)} helps ${fallback(formData.personSuffering, 'the target users')} with ${fallback(formData.problem, 'the real-world problem captured in the Life Map')}.`],
    ['Real-world role', fallback(formData.realLifeRole, 'Domain expert')],
    ['Industry/world', fallback(formData.industry, 'Real-world workflow')],
    ['Main user', fallback(formData.personSuffering || formData.users, 'People closest to the broken workflow')],
    ['Pain points', fallback(formData.problem, 'The current workflow is hard to finish, track, or trust.')],
    ['Current workaround', fallback(formData.currentWorkaround, 'Manual work, scattered notes, screenshots, calls, or spreadsheets.')],
    ['Workflow steps', fallback(formData.workflowBreaks, 'Start -> capture information -> review progress -> complete the useful outcome.')],
    ['Where the workflow breaks', fallback(formData.workflowBreaks, 'The handoff between steps is unclear or too manual.')],
    ['What a generic coder would miss', fallback(formData.genericCoderMiss, 'The hidden domain pressure, emotional context, and small details that should not be flattened.')],
    ['First useful outcome', fallback(formData.firstUsefulResult, 'A focused first version that proves the app is useful.')],
    ['Core user actions', fallback(formData.userFirstActions, 'Create an item, update progress, search or filter, and export a result.')],
    ['Core owner/admin actions', fallback(formData.ownerActions, 'Manage templates, review progress, and keep the app organized.')],
    ['Pages needed', pages.join(', ')],
    ['Saved information needed', listOrFallback(formData.savedInformation, ['users', 'projects', 'notes', 'status']).join(', ')],
    ['Outside services needed', listOrFallback(formData.outsideServices, ['none for v1']).join(', ')],
    ['Risks / trust issues', 'Keep the first version narrow. Test forms, saved information, mobile layout, and any outside service before making live.'],
    ['What not to build yet', fallback(formData.doNotBuildYet, 'Do not build advanced features until the first useful version is proven.')],
  ];
}

export function generateFirstUsefulVersion(formData) {
  return [
    ['Smallest useful version worth building', `${toProjectName(formData)} should first help ${fallback(formData.personSuffering || formData.users, 'users')} reach this outcome: ${fallback(formData.firstUsefulResult, 'complete the most important workflow with less friction')}.`],
    ['What it must do', fallback(formData.userFirstActions, 'Let users create the main item, track progress, and complete the key action.')],
    ['What it should ignore for now', fallback(formData.doNotBuildYet, 'Avoid complex integrations, marketplaces, mobile apps, and anything that distracts from the first useful result.')],
    ['Why this version proves the idea', 'It proves whether the lived workflow can become a clear app experience before spending time on advanced features.'],
    ['What success looks like', 'A real user can open the app, understand what to do, save the right information, and reach the first useful result.'],
    ['What can be added later', 'Payments, deeper automation, collaboration, richer analytics, web-link publishing, and desktop export can come after the first workflow is proven.'],
    ['Do not build yet', fallback(formData.doNotBuildYet, 'Do not build the big future version yet. Build the useful proof first.')],
  ];
}

export function generateOwnerManual(formData) {
  const pages = getGeneratedPageNames(formData).map((page) => page.replace('.jsx', ''));
  const savedInformation = listOrFallback(formData.savedInformation, ['users', 'projects', 'notes', 'status']);
  const outsideServices = listOrFallback(formData.outsideServices, ['none listed for v1']);

  return [
    ['What this app does', fallback(formData.problem, `${toProjectName(formData)} supports a real-world workflow captured in the Life Map.`)],
    ['Who uses it', fallback(formData.users || formData.personSuffering, 'The people closest to the workflow.')],
    ['What pages it has', pages.join(', ')],
    ['What users can do', fallback(formData.userFirstActions, 'Create, update, review, and complete the main workflow.')],
    ['What the owner/admin can do', fallback(formData.ownerActions, 'Review activity, manage templates, and keep the app useful.')],
    ['What information the app saves', savedInformation.join(', ')],
    ['What outside services it may use', outsideServices.join(', ')],
    ['What secret keys may be needed', outsideServices.includes('none listed for v1') ? 'No secret keys listed yet.' : `Secret keys may be needed for: ${outsideServices.join(', ')}.`],
    ['What it may cost to run', 'Phase 1 is local-first. Future costs may include hosting, outside services, file storage, email, payments, or AI usage.'],
    ['What can break', 'Forms, saved information, outside services, mobile layout, and exported files should be checked before sharing.'],
    ['What not to touch', fallback(formData.doNotBuildYet, 'Avoid expanding the product before the first useful workflow is proven.')],
    ['How to test it', 'Open each page, submit each form, review sample saved information, check mobile preview, and read the Owner Manual before exporting.'],
    ['How to update it safely', 'Describe the change in Plain, identify affected pages and saved information, save a safe version, then test before sharing.'],
    ['How to hand it to another builder', 'Export the full Markdown package and the generated app files. Give the future builder the Life Map and Owner Manual first.'],
  ];
}

export function generatePreviewData(formData) {
  const pages = getGeneratedPageNames(formData).map((page) => page.replace('.jsx', '').replace(/Page$/, ''));
  const savedInformation = listOrFallback(formData.savedInformation, ['users', 'projects', 'notes']);
  const features = listOrFallback(formData.mustHaveFeatures, ['Dashboard', 'Forms', 'Owner Mode']);

  return {
    title: toProjectName(formData),
    subtitle: fallback(formData.firstUsefulResult, 'A focused first useful version built from lived experience.'),
    pages,
    savedInformation,
    features,
    ownerPanel: {
      status: 'Local preview ready',
      folder: toFolderName(formData),
      manual: 'Owner Manual generated',
    },
  };
}

export function generateFullMarkdownPackage(formData, generatedState) {
  const files = generatedState?.files || generateProjectFiles(formData);
  const workflowMap = generatedState?.workflowMap || generateWorkflowMap(formData);
  const firstUsefulVersion = generatedState?.firstUsefulVersion || generateFirstUsefulVersion(formData);
  const ownerManual = generatedState?.ownerManual || generateOwnerManual(formData);
  const fileTree = generatedState?.fileTree || generateFileTree(formData);

  const section = (title, rows) => `## ${title}\n\n${rows.map(([label, text]) => `### ${label}\n\n${text}`).join('\n\n')}`;
  const lifeMap = Object.entries(formData)
    .filter(([, value]) => value && (!Array.isArray(value) || value.length))
    .map(([key, value]) => `- ${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n');

  return `# ${toProjectName(formData)} VibeStudio Package

Generated by VibeStudio Phase 1.

VibeStudio is the workspace.

No Git. No terminal. No jargon.

Build it. Ship it. Own it. Forever.

## Project Summary

${fallback(formData.problem, 'This project was generated from a Life Map.')}

## Life Map

${lifeMap || 'Add Life Map details to improve this package.'}

${section('Workflow Map', workflowMap)}

${section('First Useful Version', firstUsefulVersion)}

## Project File Tree

${fileTree.map((path) => `- ${path}`).join('\n')}

## Generated File Contents

${Object.entries(files)
  .map(([path, content]) => `### ${path}\n\n\`\`\`\n${content}\n\`\`\``)
  .join('\n\n')}

${section('Owner Manual', ownerManual)}

## Export notes

VibeStudio v1 runs locally. Web link publishing and desktop app export will come later. The owner should never need to understand Git, terminal, branches, commits, or deployment settings.
`;
}
