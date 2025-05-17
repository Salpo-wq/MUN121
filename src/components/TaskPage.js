import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

function TaskPage() {
  // Purple-themed color palette for styling to match Dashboard
  const purpleColors = {
    // Primary purple shades
    primary: '#6a4c93',      // Deep purple
    secondary: '#8363ac',    // Medium purple
    tertiary: '#9d80c3',     // Light purple
    quaternary: '#b39ddb',   // Lavender
    quinary: '#d1c4e9',      // Very light purple
    
    // Complementary colors
    accent1: '#4d4398',      // Blue-purple
    accent2: '#7e57c2',      // Brighter purple
    accent3: '#5e35b1',      // Deeper violet
    
    // Functional colors for status
    completed: '#7986cb',    // Blue-ish purple
    inProgress: '#9575cd',   // Medium purple
    review: '#5c6bc0',       // Blue-purple
    todo: '#673ab7',         // Deep purple
  };
  
  // Safe hexToRgb function that handles undefined values
  const safeHexToRgb = (hex) => {
    if (!hex) return '0, 0, 0'; // Default fallback for undefined/null
    try {
      // Remove the # if present
      hex = hex.replace('#', '');
      
      // Parse the hex values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    } catch (error) {
      console.error("Error in hexToRgb:", error);
      return '0, 0, 0'; // Fallback if any error occurs
    }
  };

  const { projectId, taskId } = useParams();
  const history = useHistory();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState('create');
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('list');

  // Function to get appropriate status color using the purple palette
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return purpleColors.completed;
      case 'In Progress': return purpleColors.inProgress;
      case 'Review': return purpleColors.review;
      case 'To Do': 
      case 'Not Started': return purpleColors.todo;
      default: return purpleColors.quaternary;
    }
  };

  // Function to get appropriate priority color using the purple palette
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return purpleColors.primary;
      case 'High': return purpleColors.accent2;
      case 'Medium': return purpleColors.tertiary;
      case 'Low': return purpleColors.quaternary;
      default: return purpleColors.quaternary;
    }
  };

  useEffect(() => {
    // In a real app, fetch data from API
    const fetchData = async () => {
      try {
        // This is mock data for demonstration
        const mockProject = {
          id: projectId || taskId,
          title: 'Municipal Infrastructure Development Project',
          description: 'Comprehensive infrastructure development project following standard municipal project management processes'
        };
        
        const mockMilestones = [
          { id: 1, name: 'Stage 1 - Studies' },
          { id: 2, name: 'Stage 2 - Initial Design' },
          { id: 3, name: 'Stage 3 - Detailed Design' },
          { id: 4, name: 'Stage 4 - Tender Document' },
          { id: 5, name: 'Stage 5 - Tendering & Award' },
          { id: 6, name: 'Stage 6 - Execution' },
          { id: 7, name: 'Stage 7 - Maintenance & Defects Liability' },
          { id: 8, name: 'Stage 8 - Contract Adjustments' },
          { id: 9, name: 'Stage 9 - Closing' }
        ];
        
        const mockTeamMembers = [
          { id: 1, name: 'Mohammad ', role: 'Project Manager', avatar: 'https://via.placeholder.com/40' },
          { id: 2, name: 'Ali', role: 'Design Engineer', avatar: 'https://via.placeholder.com/40' },
          { id: 3, name: 'Abdulla ', role: 'Contract Manager', avatar: 'https://via.placeholder.com/40' },
          { id: 4, name: 'Ahmed', role: 'Quality Assurance', avatar: 'https://via.placeholder.com/40' }
        ];
        
        // All tasks from our project template
        const mockTasks = [
          // Stage 1 - Studies
          {
            id: 101,
            name: 'Creation of Project Charter',
            status: 'Completed',
            description: 'Develop and finalize the project charter document',
            startDate: '2023-06-01',
            dueDate: '2023-06-15',
            milestone: 'Stage 1 - Studies',
            milestoneId: 1,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [],
            files: []
          },
          {
            id: 102,
            name: 'Preparations for Conceptual Design',
            status: 'Completed',
            description: 'Gather requirements and prepare for conceptual design',
            startDate: '2023-06-16',
            dueDate: '2023-06-30',
            milestone: 'Stage 1 - Studies',
            milestoneId: 1,
            assignedTo: { id: 2, name: 'Ali', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [101],
            files: []
          },
          
          // Stage 2 - Initial Design
          {
            id: 201,
            name: 'Producing Conceptual Design Layout',
            status: 'Completed',
            description: 'Create conceptual design layouts',
            startDate: '2023-07-01',
            dueDate: '2023-07-15',
            milestone: 'Stage 2 - Initial Design',
            milestoneId: 2,
            assignedTo: { id: 2, name: 'Ali', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [102],
            files: []
          },
          {
            id: 202,
            name: 'Wayleave Permits Follow-up',
            status: 'Completed',
            description: 'Follow up on necessary permits and clearances',
            startDate: '2023-07-10',
            dueDate: '2023-07-25',
            milestone: 'Stage 2 - Initial Design',
            milestoneId: 2,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [],
            files: []
          },
          {
            id: 203,
            name: 'Producing the Full Initial Design',
            status: 'Completed',
            description: 'Develop full initial design based on conceptual layout',
            startDate: '2023-07-15',
            dueDate: '2023-08-05',
            milestone: 'Stage 2 - Initial Design',
            milestoneId: 2,
            assignedTo: { id: 2, name: 'Ali', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [201],
            files: []
          },
          {
            id: 204,
            name: 'External Stakeholders\' Approval',
            status: 'Completed',
            description: 'Secure approval from all external stakeholders',
            startDate: '2023-08-06',
            dueDate: '2023-08-15',
            milestone: 'Stage 2 - Initial Design',
            milestoneId: 2,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Critical',
            dependencies: [203],
            files: []
          },
          
          // Stage 3 - Detailed Design
          {
            id: 301,
            name: 'Preparation of Detailed Drawings',
            status: 'Completed',
            description: 'Create detailed engineering drawings',
            startDate: '2023-08-16',
            dueDate: '2023-09-15',
            milestone: 'Stage 3 - Detailed Design',
            milestoneId: 3,
            assignedTo: { id: 2, name: 'Ali', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [204],
            files: []
          },
          {
            id: 302,
            name: 'Preparation of Cost Estimate',
            status: 'Completed',
            description: 'Develop detailed cost estimates for the project',
            startDate: '2023-09-01',
            dueDate: '2023-09-30',
            milestone: 'Stage 3 - Detailed Design',
            milestoneId: 3,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [301],
            files: []
          },
          {
            id: 303,
            name: 'Value Engineering',
            status: 'Completed',
            description: 'Perform value engineering to optimize costs and benefits',
            startDate: '2023-09-20',
            dueDate: '2023-10-10',
            milestone: 'Stage 3 - Detailed Design',
            milestoneId: 3,
            assignedTo: { id: 4, name: 'Abdulla', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [302],
            files: []
          },
          {
            id: 304,
            name: 'Obtaining Approvals',
            status: 'Completed',
            description: 'Secure necessary approvals for detailed design',
            startDate: '2023-10-05',
            dueDate: '2023-10-15',
            milestone: 'Stage 3 - Detailed Design',
            milestoneId: 3,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Critical',
            dependencies: [303],
            files: []
          },
          
          // Stage 4 - Tender Document
          {
            id: 401,
            name: 'Preparation of Tender Documents',
            status: 'Completed',
            description: 'Create comprehensive tender documents',
            startDate: '2023-10-16',
            dueDate: '2023-11-05',
            milestone: 'Stage 4 - Tender Document',
            milestoneId: 4,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [304],
            files: []
          },
          {
            id: 402,
            name: 'Application for Financial Approval to Tender',
            status: 'Completed',
            description: 'Secure financial approval for tendering process',
            startDate: '2023-11-06',
            dueDate: '2023-11-15',
            milestone: 'Stage 4 - Tender Document',
            milestoneId: 4,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Critical',
            dependencies: [401],
            files: []
          },
          
          // Stage 5 - Tendering & Award
          {
            id: 501,
            name: 'Apply for Tender Board Approval',
            status: 'Completed',
            description: 'Submit application to tender board for approval',
            startDate: '2023-11-16',
            dueDate: '2023-11-30',
            milestone: 'Stage 5 - Tendering & Award',
            milestoneId: 5,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [402],
            files: []
          },
          {
            id: 502,
            name: 'Tendering',
            status: 'Completed',
            description: 'Execute the tendering process',
            startDate: '2023-12-01',
            dueDate: '2023-12-21',
            milestone: 'Stage 5 - Tendering & Award',
            milestoneId: 5,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [501],
            files: []
          },
          {
            id: 503,
            name: 'Tender Evaluation',
            status: 'In Progress',
            description: 'Evaluate submitted tenders',
            startDate: '2023-12-22',
            dueDate: '2024-01-10',
            milestone: 'Stage 5 - Tendering & Award',
            milestoneId: 5,
            assignedTo: { id: 4, name: 'Abdulla', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [502],
            files: []
          },
          {
            id: 504,
            name: 'Financial Approval for Tender Award',
            status: 'In Progress',
            description: 'Secure financial approval for awarding tender',
            startDate: '2024-01-05',
            dueDate: '2024-01-12',
            milestone: 'Stage 5 - Tendering & Award',
            milestoneId: 5,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Critical',
            dependencies: [503],
            files: []
          },
          {
            id: 505,
            name: 'Tender Award',
            status: 'To Do',
            description: 'Announce and award tender to selected contractor',
            startDate: '2024-01-13',
            dueDate: '2024-01-15',
            milestone: 'Stage 5 - Tendering & Award',
            milestoneId: 5,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Critical',
            dependencies: [504],
            files: []
          },
          
          // Stage 6 - Execution
          {
            id: 601,
            name: 'Contract Commencement',
            status: 'To Do',
            description: 'Initiate contract execution',
            startDate: '2024-01-16',
            dueDate: '2024-01-30',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [505],
            files: []
          },
          {
            id: 602,
            name: 'Contract General Submittals',
            status: 'To Do',
            description: 'Process contract submittals',
            startDate: '2024-01-31',
            dueDate: '2024-02-15',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [601],
            files: []
          },
          {
            id: 603,
            name: 'Progress Meetings',
            status: 'To Do',
            description: 'Conduct regular progress meetings',
            startDate: '2024-02-01',
            dueDate: '2024-05-15',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [601],
            files: []
          },
          {
            id: 604,
            name: 'Requests Management',
            status: 'To Do',
            description: 'Manage requests from contractor and stakeholders',
            startDate: '2024-02-01',
            dueDate: '2024-05-15',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 4, name: 'Abdulla', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [601],
            files: []
          },
          {
            id: 605,
            name: 'Variation Orders Processing',
            status: 'To Do',
            description: 'Process and manage variation orders',
            startDate: '2024-02-15',
            dueDate: '2024-05-10',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [602],
            files: []
          },
          {
            id: 606,
            name: 'Payments Processing',
            status: 'To Do',
            description: 'Process contractor payments',
            startDate: '2024-03-01',
            dueDate: '2024-05-15',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [602],
            files: []
          },
          {
            id: 607,
            name: 'Progress Reports',
            status: 'To Do',
            description: 'Generate regular progress reports',
            startDate: '2024-02-15',
            dueDate: '2024-05-15',
            milestone: 'Stage 6 - Execution',
            milestoneId: 6,
            assignedTo: { id: 2, name: 'Ali', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [603],
            files: []
          },
          
          // Stage 7 - Maintenance & Defects Liability
          {
            id: 701,
            name: 'Closing Submittals',
            status: 'To Do',
            description: 'Process closing documentation',
            startDate: '2024-05-16',
            dueDate: '2024-06-15',
            milestone: 'Stage 7 - Maintenance & Defects Liability',
            milestoneId: 7,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [607],
            files: []
          },
          {
            id: 702,
            name: 'Handover to Municipal Entity',
            status: 'To Do',
            description: 'Execute handover to municipal entity',
            startDate: '2024-06-16',
            dueDate: '2024-07-15',
            milestone: 'Stage 7 - Maintenance & Defects Liability',
            milestoneId: 7,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [701],
            files: []
          },
          {
            id: 703,
            name: 'DLP Performance Record',
            status: 'To Do',
            description: 'Record DLP performance metrics',
            startDate: '2024-07-16',
            dueDate: '2024-08-15',
            milestone: 'Stage 7 - Maintenance & Defects Liability',
            milestoneId: 7,
            assignedTo: { id: 4, name: 'Abdulla', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [702],
            files: []
          },
          
          // Stage 8 - Contract Adjustments
          {
            id: 801,
            name: 'Extension of Time',
            status: 'To Do',
            description: 'Process time extension requests',
            startDate: '2024-08-16',
            dueDate: '2024-08-31',
            milestone: 'Stage 8 - Contract Adjustments',
            milestoneId: 8,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [703],
            files: []
          },
          {
            id: 802,
            name: 'Additional Funding',
            status: 'To Do',
            description: 'Secure additional funding if necessary',
            startDate: '2024-09-01',
            dueDate: '2024-09-15',
            milestone: 'Stage 8 - Contract Adjustments',
            milestoneId: 8,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'High',
            dependencies: [801],
            files: []
          },
          
          // Stage 9 - Closing
          {
            id: 901,
            name: 'Cost Adjustment',
            status: 'To Do',
            description: 'Review and adjust final costs',
            startDate: '2024-09-16',
            dueDate: '2024-10-15',
            milestone: 'Stage 9 - Closing',
            milestoneId: 9,
            assignedTo: { id: 3, name: 'Ahmed', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [802],
            files: []
          },
          {
            id: 902,
            name: 'Releasing the Performance Bond',
            status: 'To Do',
            description: 'Process release of performance bond',
            startDate: '2024-10-16',
            dueDate: '2024-11-30',
            milestone: 'Stage 9 - Closing',
            milestoneId: 9,
            assignedTo: { id: 1, name: 'Mohammad ', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [901],
            files: []
          },
          {
            id: 903,
            name: 'Lessons Learned',
            status: 'To Do',
            description: 'Document lessons learned and project closing report',
            startDate: '2024-12-01',
            dueDate: '2024-12-31',
            milestone: 'Stage 9 - Closing',
            milestoneId: 9,
            assignedTo: { id: 4, name: 'Abdulla', avatar: 'https://via.placeholder.com/40' },
            priority: 'Medium',
            dependencies: [902],
            files: []
          }
        ];
        
        setProject(mockProject);
        setMilestones(mockMilestones);
        setProjectMembers(mockTeamMembers);
        setTasks(mockTasks);
        setLoading(false);
        
        // If taskId is provided, fetch and select that task
        if (taskId) {
          const task = mockTasks.find(t => t.id.toString() === taskId.toString());
          if (task) {
            setSelectedTask(task);
            setTaskModalMode('edit');
            setShowTaskModal(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [projectId, taskId]);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setTaskModalMode('create');
    setShowTaskModal(true);
  };
  
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setTaskModalMode('edit');
    setShowTaskModal(true);
  };
  
  const handleTaskSubmit = (task) => {
    // In a real app, send to API
    if (taskModalMode === 'create') {
      // Add new task
      const newTask = {
        ...task,
        id: Date.now(), // Generate a temporary ID
        files: []
      };
      setTasks([...tasks, newTask]);
    } else {
      // Update existing task
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, ...task } : t
      );
      setTasks(updatedTasks);
    }
    
    setShowTaskModal(false);
  };
  
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      // In a real app, send to API
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };
  
  const handleFileChange = (event) => {
    // Handle file selection
    console.log('File selected:', event.target.files[0]);
  };
  
  const handleUploadFile = (taskId) => {
    setSelectedTaskId(taskId);
    setShowFileModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border" style={{ color: purpleColors.primary }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="task-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">
            {projectId ? `Tasks for ${project.title}` : 'All Tasks'}
            {taskId && ' > Task Details'}
          </h2>
          {projectId && (
            <p className="text-muted">{project.description}</p>
          )}
        </div>
        <div>
          <Link 
            to={projectId ? `/projects/${projectId}` : '/projects'} 
            className="btn btn-outline-primary rounded-pill me-2"
            style={{ borderColor: purpleColors.primary, color: purpleColors.primary }}
          >
            <i className="bi bi-arrow-left me-1"></i> Back
          </Link>
          <button 
            className="btn btn-primary rounded-pill" 
            onClick={handleCreateTask}
            style={{ backgroundColor: purpleColors.primary, borderColor: purpleColors.primary }}
          >
            <i className="bi bi-plus-circle me-1"></i> Add Task
          </button>
        </div>
      </div>
      
      <div className="dashboard-card">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
                style={activeTab === 'list' ? {
                  borderBottomColor: purpleColors.primary,
                  color: purpleColors.primary,
                  fontWeight: '500'
                } : {}}
              >
                <i className="bi bi-list-task me-1"></i> Task List
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'kanban' ? 'active' : ''}`}
                onClick={() => setActiveTab('kanban')}
                style={activeTab === 'kanban' ? {
                  borderBottomColor: purpleColors.primary,
                  color: purpleColors.primary,
                  fontWeight: '500'
                } : {}}
              >
                <i className="bi bi-kanban me-1"></i> Kanban
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Milestone</th>
                  <th>Due Date</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: getStatusColor(task.status) }}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <div className="text-truncate" style={{ maxWidth: "150px" }}>
                        {task.milestone}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-calendar-event me-1" style={{ color: purpleColors.tertiary }}></i>
                        {task.dueDate}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle me-2" style={{ 
                          backgroundColor: `rgba(${safeHexToRgb(purpleColors.primary)}, 0.1)`,
                          color: purpleColors.primary,
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {task.assignedTo.name.charAt(0)}
                        </div>
                        <span>{task.assignedTo.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button 
                          className="btn btn-sm btn-outline-primary rounded-start"
                          onClick={() => handleEditTask(task)}
                          style={{ borderColor: purpleColors.primary, color: purpleColors.primary }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary rounded-end" 
                          onClick={() => handleUploadFile(task.id)}
                        >
                          <i className="bi bi-file-earmark-arrow-up"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {tasks.length === 0 && (
            <div className="text-center my-5">
              <div className="empty-state py-4">
                <i className="bi bi-clipboard-plus fs-1" style={{ color: purpleColors.primary }}></i>
                <p className="text-muted mt-3 mb-4">No tasks found for this project</p>
                <button 
                  className="btn btn-primary rounded-pill"
                  onClick={handleCreateTask}
                  style={{ backgroundColor: purpleColors.primary, borderColor: purpleColors.primary }}
                >
                  <i className="bi bi-plus-circle me-1"></i> Add First Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Task Modal */}
      {showTaskModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header" style={{ borderBottom: `1px solid rgba(${safeHexToRgb(purpleColors.primary)}, 0.2)` }}>
                <h5 className="modal-title" style={{ color: purpleColors.primary }}>
                  <i className={`bi ${taskModalMode === 'create' ? 'bi-plus-circle' : 'bi-pencil-square'} me-2`}></i>
                  {taskModalMode === 'create' ? 'Create New Task' : 'Edit Task'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTaskModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Form handling would go here in a real app
                  // For now, let's just close the modal
                  handleTaskSubmit({
                    id: selectedTask ? selectedTask.id : Date.now(),
                    name: document.getElementById('taskName').value,
                    description: document.getElementById('taskDescription').value,
                    startDate: document.getElementById('taskStartDate').value,
                    dueDate: document.getElementById('taskDueDate').value,
                    status: document.getElementById('taskStatus').value,
                    milestone: document.getElementById('taskMilestone').value,
                    priority: document.getElementById('taskPriority').value,
                    assignedTo: projectMembers.find(m => m.id.toString() === document.getElementById('taskAssignee').value)
                  });
                }}>
                  <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Task Name</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ color: purpleColors.primary }}>
                        <i className="bi bi-check-square"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        defaultValue={selectedTask?.name || ''}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">Description</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ color: purpleColors.primary }}>
                        <i className="bi bi-card-text"></i>
                      </span>
                      <textarea
                        className="form-control"
                        id="taskDescription"
                        rows="3"
                        defaultValue={selectedTask?.description || ''}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taskStartDate" className="form-label">Start Date</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ color: purpleColors.primary }}>
                          <i className="bi bi-calendar-event"></i>
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          id="taskStartDate"
                          defaultValue={selectedTask?.startDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taskDueDate" className="form-label">Due Date</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ color: purpleColors.primary }}>
                          <i className="bi bi-calendar-check"></i>
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          id="taskDueDate"
                          defaultValue={selectedTask?.dueDate || ''}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taskStatus" className="form-label">Status</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ color: purpleColors.primary }}>
                          <i className="bi bi-clock-history"></i>
                        </span>
                        <select
                          className="form-select"
                          id="taskStatus"
                          defaultValue={selectedTask?.status || 'Not Started'}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Review">Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taskPriority" className="form-label">Priority</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ color: purpleColors.primary }}>
                          <i className="bi bi-flag"></i>
                        </span>
                        <select
                          className="form-select"
                          id="taskPriority"
                          defaultValue={selectedTask?.priority || 'Medium'}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taskMilestone" className="form-label">Milestone</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ color: purpleColors.primary }}>
                          <i className="bi bi-flag-fill"></i>
                        </span>
                        <select
                          className="form-select"
                          id="taskMilestone"
                          defaultValue={selectedTask?.milestone || ''}
                          required
                        >
                          <option value="">Select Milestone</option>
                          {milestones.map(milestone => (
                            <option key={milestone.id} value={milestone.name}>
                              {milestone.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taskAssignee" className="form-label">Assigned To</label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ color: purpleColors.primary }}>
                          <i className="bi bi-person"></i>
                        </span>
                        <select
                          className="form-select"
                          id="taskAssignee"
                          defaultValue={selectedTask?.assignedTo?.id || ''}
                          required
                        >
                          <option value="">Select Team Member</option>
                          {projectMembers.map(member => (
                            <option key={member.id} value={member.id}>
                              {member.name} - {member.role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer" style={{ borderTop: `1px solid rgba(${safeHexToRgb(purpleColors.primary)}, 0.2)` }}>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary rounded-pill" 
                      onClick={() => setShowTaskModal(false)}
                    >
                      <i className="bi bi-x-circle me-1"></i> Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary rounded-pill"
                      style={{ backgroundColor: purpleColors.primary, borderColor: purpleColors.primary }}
                    >
                      <i className={`bi ${taskModalMode === 'create' ? 'bi-plus-circle' : 'bi-check-circle'} me-1`}></i>
                      {taskModalMode === 'create' ? 'Create Task' : 'Update Task'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* File Upload Modal */}
      {showFileModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ borderBottom: `1px solid rgba(${safeHexToRgb(purpleColors.primary)}, 0.2)` }}>
                <h5 className="modal-title" style={{ color: purpleColors.primary }}>
                  <i className="bi bi-file-earmark-arrow-up me-2"></i>Upload File
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowFileModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="file-input" className="form-label">Select File</label>
                  <div className="input-group">
                    <span className="input-group-text" style={{ color: purpleColors.primary }}>
                      <i className="bi bi-file-earmark"></i>
                    </span>
                    <input
                      type="file"
                      className="form-control"
                      id="file-input"
                      onChange={handleFileChange}
                    />
                  </div>
                  <small className="text-muted mt-1">Maximum file size: 10MB</small>
                </div>
                {selectedTaskId && (
                  <div className="mb-3">
                    <h6 className="text-muted mb-3">Existing Files</h6>
                    {tasks.find(t => t.id === selectedTaskId).files &&
                     Array.isArray(tasks.find(t => t.id === selectedTaskId).files) &&
                     tasks.find(t => t.id === selectedTaskId).files.length > 0 ? (
                      <ul className="list-group">
                        {tasks.find(t => t.id === selectedTaskId).files.map(file => (
                          <li key={file.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bi bi-file-earmark me-2" style={{ color: purpleColors.secondary }}></i>
                              {file.name}
                            </div>
                            <button className="btn btn-sm btn-outline-danger rounded-pill">
                              <i className="bi bi-trash me-1"></i> Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="empty-state py-3 text-center">
                        <i className="bi bi-file-earmark-x fs-2" style={{ color: purpleColors.quaternary }}></i>
                        <p className="text-muted mt-2">No files attached to this task</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="modal-footer" style={{ borderTop: `1px solid rgba(${safeHexToRgb(purpleColors.primary)}, 0.2)` }}>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary rounded-pill" 
                  onClick={() => setShowFileModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary rounded-pill"
                  style={{ backgroundColor: purpleColors.primary, borderColor: purpleColors.primary }}
                >
                  <i className="bi bi-cloud-upload me-1"></i> Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskPage;