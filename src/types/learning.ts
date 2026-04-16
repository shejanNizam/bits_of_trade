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

export interface Video {
  id: number;
  title: string;
  description: string | null;
  video: string;
  is_free: boolean;
  is_complete: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  course: {
    id: number;
    title: string;
    course_type: string;
    course_level: string;
  };
}

export interface Course {
  id: number;
  title: string;
  about: string | null;
  description: string | null;
  course_type: string;
  course_level: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  lessons: {
    id: number;
    title: string;
    description: string;
  };
  videos: Video[];
}

export interface LearningLesson {
  id: number;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  courses: Course[];
}

// For your API Response with Pagination
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
