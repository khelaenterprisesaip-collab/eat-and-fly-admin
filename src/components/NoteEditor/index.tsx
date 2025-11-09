import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import ThemeButton from "components/ui/Button";

export function NoteEditor({
  label,
  note,
  isEditing,
  setNote,
  setIsEditing,
  saveNote,
  loading,
}: any) {
  return (
    <div>
      {isEditing ? (
        <div className="space-y-3">
          <TextField
            placeholder={` Enter notes for ${label?.toLowerCase()}`}
            multiline
            rows={4}
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <ThemeButton
              size="small"
              variant="outlined"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </ThemeButton>
            <ThemeButton
              size="small"
              loading={loading}
              variant="contained"
              onClick={saveNote}
              disabled={!note.trim()}
            >
              Save
            </ThemeButton>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="p-4 min-h-[110px] border border-[#bec8d0] rounded-md cursor-text hover:border-blue-500 transition-colors"
        >
          <Typography variant="body1" fontWeight={300} color={"#969ba2"}>
            {"Click to add notes..."}
          </Typography>
        </div>
      )}
    </div>
  );
}
