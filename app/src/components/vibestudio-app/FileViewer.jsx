import CopyButton from './CopyButton.jsx';

export default function FileViewer({ content = '', path }) {
  return (
    <div className="vs-file-viewer">
      <div className="vs-file-viewer-head">
        <div>
          <span>Selected file</span>
          <strong>{path || 'Choose a file'}</strong>
        </div>
        <CopyButton text={content} label="Copy selected file" />
      </div>
      <pre>{content || 'Select a generated file to see its contents.'}</pre>
    </div>
  );
}
