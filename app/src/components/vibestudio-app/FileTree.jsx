function pathDepth(path) {
  return path.split('/').length - 1;
}

export default function FileTree({ paths = [], selectedPath, onSelect }) {
  return (
    <div className="vs-file-tree">
      {paths.map((path) => {
        const label = path.split('/').pop();
        const depth = pathDepth(path);

        return (
          <button
            key={path}
            type="button"
            className={`vs-file-node ${selectedPath === path ? 'vs-file-node-active' : ''}`}
            style={{ paddingLeft: `${Math.min(depth, 5) * 14 + 12}px` }}
            onClick={() => onSelect(path)}
          >
            <span>{label}</span>
            <em>{path.includes('.') ? 'file' : 'folder'}</em>
          </button>
        );
      })}
    </div>
  );
}
