import { useState } from 'react'

export function CreateFolder() {
  const [folderName, setFolderName] = useState('new-folder')

  const handleCreateFolder = async () => {
    try {
      // Windows-specific folder path. Adjust as needed.
      // Note: Use double backslashes to escape in a JavaScript string.

      const result = await window.electron.createFolder(folderName)
      console.log(result)
      alert(result.message)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An error occurred')
      }
    }
  }

  return (
    <div>
      <label htmlFor="folder_name_input">Input Folder Name:</label>
      <input
        name="folder_name_input"
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
    </div>
  )
}
