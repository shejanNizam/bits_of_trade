// Learning Lesson Types
// export interface LearningLesson {
//   id: number;
//   title: string;
//   description: string | null;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
//   courses: Course[];
// }

// Course Types
// export interface Course {
//   id: number;
//   title: string;
//   about: string | null;
//   description: string | null;
//   course_type: string;
//   course_level: "beginner" | "intermediate" | "advanced";
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
//   lessons: {
//     id: number;
//     title: string;
//     description: string;
//   };
//   videos: Video[];
// }

// Video Types
// export interface Video {
//   id: number;
//   title: string;
//   description: string | null;
//   video: string;
//   course: {
//     id: number;
//     title: string;
//     course_type: string;
//     course_level: string;
//   };
//   is_free: boolean;
//   is_complete: boolean;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// }

// User Course Progress Types
export interface UserCourseProgress {
  id: number;
  user: {
    id: number;
    email: string;
  };
  course: {
    id: number;
    title: string;
    course_type: string;
    course_level: string;
  };
  videos_watched: {
    id: number;
    title: string;
  }[];
  started_at: string;
  completed_at: string | null;
  completion_percentage: number;
  total_videos: number;
  completed_videos: number;
  is_completed: boolean;
  total_UserCourseStart: number;
  total_completed_UserCourseStart: number;
}

// Component Props Types
export interface LessonCardData {
  id: number;
  title: string;
  type: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  outcome: string;
  insight: string;
  color: string;
  courseId: number;
}

export interface LearningPathData {
  id: number;
  title: string;
  tag: string;
  level: string;
  modules: number;
  completed: number;
  time: string;
  color: string;
  courseId: number;
}

export interface Video {
  id: number;
  title: string;
  video: string;
  is_free: boolean;
  is_complete: boolean;
  is_active: boolean;
  description?: string;
  course?: { id: number; title: string };
}

export interface Course {
  id: number;
  title: string;
  about: string;
  description: string;
  course_type: string;
  course_level: string;
  is_active?: boolean;
  videos: Video[];
}

export interface LearningLesson {
  id: number;
  title: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  courses: Course[];
}
