import "./CourseNotes.scss";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { getNotes, setNotes } from "../../utils/localStorage";

import Card from "../Card/Card";
import { syncNotes } from "../../api/notes";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface CourseNotesProps {
  courseCode: string;
}

const DEBOUNCE_DELAY = 1000;

const CourseNotes: React.FC<CourseNotesProps> = ({ courseCode }) => {
  const [notes, setNotesState] = useState<string>("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const savedNotes = getNotes(courseCode);
    if (savedNotes !== null) {
      setNotesState(savedNotes);
    }
    isInitialLoadRef.current = false;
  }, [courseCode]);

  const saveNotes = useCallback(
    async (notesContent: string) => {
      setStatus("saving");
      setNotes(courseCode, notesContent);

      try {
        await syncNotes();
        setStatus("saved");
      } catch (error) {
        console.error("Failed to sync notes:", error);
        setStatus("error");
      }
    },
    [courseCode]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNotes = event.target.value;
      setNotesState(newNotes);

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new debounce timer
      debounceTimerRef.current = setTimeout(() => {
        saveNotes(newNotes);
      }, DEBOUNCE_DELAY);
    },
    [saveNotes]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const getStatusText = (): string => {
    switch (status) {
      case "saving":
        return "Saving...";
      case "saved":
        return "Saved";
      case "error":
        return "Error saving";
      default:
        return "";
    }
  };

  return (
    <Card title="My Course Notes">
      <textarea
        className="course-notes__textarea form-control"
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes here..."
        rows={6}
        aria-label="Course notes"
      />
      {status !== "idle" && (
        <div
          className={`py-2 course-notes__status course-notes__status--${status}`}
        >
          {getStatusText()}
        </div>
      )}
    </Card>
  );

  return (
    <div className="course-notes">
      <div className="course-notes__header">
        <h3 className="course-notes__title">Notes</h3>
      </div>
      <textarea
        className="course-notes__textarea form-control"
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes here..."
        rows={6}
        aria-label="Course notes"
      />
    </div>
  );
};

export default CourseNotes;
