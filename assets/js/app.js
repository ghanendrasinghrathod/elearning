// Mock Data Initialization and Management
const DEFAULT_COURSES = [
  {
    id: 'c1',
    title: 'Advanced Web Development',
    description: 'Learn React, Node.js, and modern web architectures.',
    instructor: 'Prof. Alan Turing',
    category: 'Computer Science',
    materials: [
      { id: 'm1', title: 'Syllabus.pdf', type: 'application/pdf', size: '1.2 MB', date: '2023-10-01' },
      { id: 'm2', title: 'Module 1 Notes.pdf', type: 'application/pdf', size: '2.5 MB', date: '2023-10-05' }
    ]
  },
  {
    id: 'c2',
    title: 'Data Structures & Algorithms',
    description: 'Master the core concepts of efficient problem solving.',
    instructor: 'Dr. Grace Hopper',
    category: 'Software Engineering',
    materials: [
      { id: 'm3', title: 'Course_Outline.pdf', type: 'application/pdf', size: '800 KB', date: '2023-09-15' }
    ]
  }
];

// Initialize local storage if empty
function initData() {
  if (!localStorage.getItem('elearn_courses')) {
    localStorage.setItem('elearn_courses', JSON.stringify(DEFAULT_COURSES));
  }
}

// Get all courses from local storage
function getCourses() {
  return JSON.parse(localStorage.getItem('elearn_courses')) || [];
}

// Save courses back to local storage
function saveCourses(courses) {
  localStorage.setItem('elearn_courses', JSON.stringify(courses));
}

// Add a new course
function addCourse(title, description, instructor, category) {
  const courses = getCourses();
  const newCourse = {
    id: 'c' + Date.now(),
    title,
    description,
    instructor,
    category,
    materials: []
  };
  courses.push(newCourse);
  saveCourses(courses);
  return newCourse;
}

// Add material to a specific course
function addMaterial(courseId, title, type, size) {
  const courses = getCourses();
  const courseIndex = courses.findIndex(c => c.id === courseId);
  if (courseIndex !== -1) {
    const newMaterial = {
      id: 'm' + Date.now(),
      title,
      type,
      size,
      date: new Date().toISOString().split('T')[0]
    };
    courses[courseIndex].materials.push(newMaterial);
    saveCourses(courses);
    return newMaterial;
  }
  return null;
}

// Call init on load
initData();

// Utility function to show toast/notifications
function showToast(message) {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = 'var(--success)';
  toast.style.color = '#fff';
  toast.style.padding = '1rem 2rem';
  toast.style.borderRadius = '50px';
  toast.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.4)';
  toast.style.zIndex = '9999';
  toast.style.transition = 'opacity 0.5s ease';
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
