import React, { useState, useEffect } from 'react';

const App = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showHighPerformers, setShowHighPerformers] = useState(false);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'
  const [loading, setLoading] = useState(true);

  // Sample student data (simulating JSON file)
  const studentData = [
    { "id": 1, "name": "Anjali", "course": "Python", "marks": 88 },
    { "id": 2, "name": "Ravi", "course": "Java", "marks": 72 },
    { "id": 3, "name": "Reddy", "course": "React", "marks": 91 },
    { "id": 4, "name": "Aman", "course": "Python", "marks": 65 },
    { "id": 5, "name": "Priya", "course": "Java", "marks": 85 },
    { "id": 6, "name": "Kiran", "course": "React", "marks": 78 },
    { "id": 7, "name": "Sneha", "course": "Python", "marks": 92 },
    { "id": 8, "name": "Arjun", "course": "Java", "marks": 81 },
    { "id": 9, "name": "Meera", "course": "React", "marks": 87 },
    { "id": 10, "name": "Vikram", "course": "Python", "marks": 79 },
    { "id": 11, "name": "Kavya", "course": "Java", "marks": 94 },
    { "id": 12, "name": "Rohit", "course": "React", "marks": 83 }
  ];

  // Load data using useEffect (simulating async JSON loading)
  useEffect(() => {
    const loadStudentData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        // In real app, you would fetch from: fetch('/studentData.json')
        setStudents(studentData);
        setFilteredStudents(studentData);
      } catch (error) {
        console.error('Error loading student data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadStudentData();
  }, []);

  // Get unique courses for dropdown
  const getUniqueCourses = () => {
    return [...new Set(students.map(student => student.course))];
  };

  // Filter and sort students
  useEffect(() => {
    let filtered = [...students];

    // Apply course filter
    if (selectedCourse) {
      filtered = filtered.filter(student => student.course === selectedCourse);
    }

    // Apply high performers filter
    if (showHighPerformers) {
      filtered = filtered.filter(student => student.marks > 80);
    }

    // Apply sorting
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.marks - b.marks);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.marks - a.marks);
    }

    setFilteredStudents(filtered);
  }, [students, selectedCourse, showHighPerformers, sortOrder]);

  const handleCourseFilter = (course) => {
    setSelectedCourse(course);
  };

  const toggleHighPerformers = () => {
    setShowHighPerformers(!showHighPerformers);
  };

  const handleSort = () => {
    if (sortOrder === 'none') {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('none');
    }
  };

  const clearFilters = () => {
    setSelectedCourse('');
    setShowHighPerformers(false);
    setSortOrder('none');
  };

  const getMarksVariant = (marks) => {
    if (marks >= 90) return 'success';
    if (marks >= 80) return 'primary';
    if (marks >= 70) return 'warning';
    return 'danger';
  };

  const getProgressVariant = (marks) => {
    if (marks >= 90) return 'success';
    if (marks >= 80) return 'info';
    if (marks >= 70) return 'warning';
    return 'danger';
  };

  // Loading state
  if (loading) {
    return (
      <div className="main-container">
        <div className="loading-spinner">
          <div className="spinner-border text-light" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light mt-3">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="container">
        {/* Header */}
        <div className="header-section">
          <h1>
            <i className="bi bi-people-fill me-3"></i>
            Student Management System
          </h1>
          <p className="lead">Manage and filter student records efficiently</p>
        </div>

        {/* Controls */}
        <div className="filter-section">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Filter by Course</label>
                  <select
                    className="form-select"
                    value={selectedCourse}
                    onChange={(e) => handleCourseFilter(e.target.value)}
                  >
                    <option value="">All Courses</option>
                    {getUniqueCourses().map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Performance Filter</label>
                  <button
                    onClick={toggleHighPerformers}
                    className={`btn btn-custom d-block w-100 ${
                      showHighPerformers ? 'btn-success' : 'btn-outline-success'
                    }`}
                  >
                    <i className="bi bi-trophy-fill me-2"></i>
                    High Performers (80+)
                  </button>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Sort Options</label>
                  <button
                    onClick={handleSort}
                    className="btn btn-custom btn-primary d-block w-100"
                  >
                    <i className={`bi ${sortOrder === 'asc' ? 'bi-sort-numeric-up' : 'bi-sort-numeric-down'} me-2`}></i>
                    Sort by Marks
                    {sortOrder === 'asc' && ' (Low to High)'}
                    {sortOrder === 'desc' && ' (High to Low)'}
                    {sortOrder === 'none' && ' (Default)'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <button
                onClick={clearFilters}
                className="btn btn-custom btn-danger"
              >
                <i className="bi bi-x-circle-fill me-2"></i>
                Clear Filters
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCourse || showHighPerformers || sortOrder !== 'none') && (
            <div className="active-filters">
              <small className="text-muted">Active filters: </small>
              {selectedCourse && (
                <span className="filter-tag">
                  <i className="bi bi-book me-1"></i>
                  Course: {selectedCourse}
                </span>
              )}
              {showHighPerformers && (
                <span className="filter-tag">
                  <i className="bi bi-trophy me-1"></i>
                  High Performers Only
                </span>
              )}
              {sortOrder !== 'none' && (
                <span className="filter-tag">
                  <i className="bi bi-sort-numeric-down me-1"></i>
                  Sorted by Marks ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Student Count */}
        <div className="text-center mb-4">
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
          </div>
        </div>

        {/* Students Grid */}
        <div className="row g-4">
          {filteredStudents.map(student => (
            <div key={student.id} className="col-md-6 col-lg-4">
              <div className="card student-card card-hover h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title mb-1">{student.name}</h5>
                      <p className="card-text text-muted small">ID: {student.id}</p>
                    </div>
                    <span className={`badge badge-marks bg-${getMarksVariant(student.marks)}`}>
                      {student.marks}%
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Course:</span>
                      <span className="fw-semibold">{student.course}</span>
                    </div>
                    
                    <div className="progress progress-bar-custom">
                      <div 
                        className={`progress-bar bg-${getProgressVariant(student.marks)}`}
                        role="progressbar"
                        style={{ width: `${student.marks}%` }}
                        aria-valuenow={student.marks}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  
                  {student.marks > 80 && (
                    <div className="text-center">
                      <span className="badge bg-success">
                        <i className="bi bi-trophy-fill me-1"></i>
                        High Performer
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="no-results">
            <i className="bi bi-search display-1 text-muted"></i>
            <h3 className="mt-3">No students found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Statistics */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="text-center text-white mb-4">
              <i className="bi bi-graph-up me-2"></i>
              Statistics Overview
            </h3>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card stats-card bg-primary text-white">
              <div className="card-body">
                <i className="bi bi-people-fill display-4 mb-2"></i>
                <h2 className="card-title">{students.length}</h2>
                <p className="card-text">Total Students</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card stats-card bg-success text-white">
              <div className="card-body">
                <i className="bi bi-trophy-fill display-4 mb-2"></i>
                <h2 className="card-title">{students.filter(s => s.marks > 80).length}</h2>
                <p className="card-text">High Performers</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card stats-card bg-info text-white">
              <div className="card-body">
                <i className="bi bi-calculator display-4 mb-2"></i>
                <h2 className="card-title">
                  {students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.marks, 0) / students.length) : 0}
                </h2>
                <p className="card-text">Average Marks</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card stats-card bg-warning text-white">
              <div className="card-body">
                <i className="bi bi-book-fill display-4 mb-2"></i>
                <h2 className="card-title">{getUniqueCourses().length}</h2>
                <p className="card-text">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;