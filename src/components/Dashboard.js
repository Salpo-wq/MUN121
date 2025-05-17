import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../styles/dashboard.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  // Purple-themed color palette for charts
  const chartColors = {
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
    underBudget: '#7986cb',  // Blue-purple
    onBudget: '#9575cd',     // Medium purple
    overBudget: '#8559da',   // Bright purple
  };

  // Data for project status chart with purple palette
  const projectStatusData = {
    labels: ['Active', 'Pending', 'Completed'],
    datasets: [
      {
        label: 'Project Status',
        data: [5, 3, 10],
        backgroundColor: [
          chartColors.inProgress,
          chartColors.tertiary,
          chartColors.completed,
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for task completion chart with purple palette
  const taskCompletionData = {
    labels: ['Completed', 'In Progress', 'Review', 'To Do'],
    datasets: [
      {
        label: 'Task Status',
        data: [25, 15, 5, 10],
        backgroundColor: [
          chartColors.completed,
          chartColors.inProgress,
          chartColors.review,
          chartColors.todo,
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for budget allocation by department with purple palette
  const budgetAllocationData = {
    labels: ['IT', 'Infrastructure', 'Public Works', 'Transportation', 'Municipal Services'],
    datasets: [
      {
        label: 'Budget Allocation',
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.tertiary,
          chartColors.quaternary,
          chartColors.quinary,
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Risk distribution data with purple palette
  const riskData = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Risks by Severity',
        data: [8, 12, 6, 3],
        backgroundColor: [
          chartColors.quaternary,
          chartColors.tertiary,
          chartColors.secondary,
          chartColors.primary,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Dashboard</h1>
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2 rounded-pill">
            <i className="bi bi-download me-1"></i> Export
          </button>
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle rounded-pill" type="button" id="dashboardActions" data-bs-toggle="dropdown">
              <i className="bi bi-gear me-1"></i> Options
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Filter Data</a></li>
              <li><a className="dropdown-item" href="#">Customize View</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Summary KPI Cards with modern styling */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="kpi-card">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="kpi-title">Active Projects</h6>
                <h2 className="kpi-value">5</h2>
              </div>
              <div className="kpi-icon" style={{ backgroundColor: 'rgba(106, 76, 147, 0.1)' }}>
                <i className="bi bi-briefcase fs-3" style={{ color: chartColors.primary }}></i>
              </div>
            </div>
            <p className="text-success mt-2 mb-0 small"><i className="bi bi-arrow-up"></i> +2 since last month</p>
            <div className="progress progress-thin mt-3">
              <div className="progress-bar" style={{ width: '56%', backgroundColor: chartColors.primary }}></div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="kpi-card">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="kpi-title">Task Completion</h6>
                <h2 className="kpi-value">67%</h2>
              </div>
              <div className="kpi-icon" style={{ backgroundColor: 'rgba(179, 157, 219, 0.1)' }}>
                <i className="bi bi-check-circle fs-3" style={{ color: chartColors.completed }}></i>
              </div>
            </div>
            <div className="progress progress-thin mt-3">
              <div className="progress-bar" style={{ width: '67%', backgroundColor: chartColors.completed }}></div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="kpi-card">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="kpi-title">On-time Delivery</h6>
                <h2 className="kpi-value">83%</h2>
              </div>
              <div className="kpi-icon" style={{ backgroundColor: 'rgba(157, 128, 195, 0.1)' }}>
                <i className="bi bi-clock fs-3" style={{ color: chartColors.tertiary }}></i>
              </div>
            </div>
            <div className="progress progress-thin mt-3">
              <div className="progress-bar" style={{ width: '83%', backgroundColor: chartColors.tertiary }}></div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="kpi-card">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="kpi-title">Active Risks</h6>
                <h2 className="kpi-value">9</h2>
              </div>
              <div className="kpi-icon" style={{ backgroundColor: 'rgba(126, 87, 194, 0.1)' }}>
                <i className="bi bi-exclamation-triangle fs-3" style={{ color: chartColors.accent2 }}></i>
              </div>
            </div>
            <p className="text-danger mt-2 mb-0 small"><i className="bi bi-arrow-up"></i> 3 critical risks need attention</p>
            <div className="progress progress-thin mt-3">
              <div className="progress-bar" style={{ width: '75%', backgroundColor: chartColors.accent2 }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Financial KPIs with modern styling */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="dashboard-card">
            <div className="card-body">
              <h6 className="kpi-title">Total Budget</h6>
              <h2 className="kpi-value">BHD 452K</h2>
              <p className="text-muted mb-3">Across all active projects</p>
              <div className="progress progress-thin mt-2">
                <div className="progress-bar" style={{ width: '100%', backgroundColor: chartColors.primary }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="dashboard-card">
            <div className="card-body">
              <h6 className="kpi-title">Spent to Date</h6>
              <h2 className="kpi-value">BHD 283K</h2>
              <p style={{ color: chartColors.tertiary }} className="mb-3">62.5% of total budget</p>
              <div className="progress progress-thin mt-2">
                <div className="progress-bar" style={{ width: '62.5%', backgroundColor: chartColors.tertiary }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="dashboard-card">
            <div className="card-body">
              <h6 className="kpi-title">Forecasted EOY</h6>
              <h2 className="kpi-value">BHD 433K</h2>
              <p style={{ color: chartColors.completed }} className="mb-3">4.2% under budget</p>
              <div className="progress progress-thin mt-2">
                <div className="progress-bar" style={{ width: '95.8%', backgroundColor: chartColors.completed }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project and Task Status with modern styling */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="dashboard-card">
            <div className="card-header">
              <h5 className="dashboard-section-title mb-0">
                <i className="bi bi-clipboard-data me-2"></i>Project Status
              </h5>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <Pie 
                  data={projectStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 15,
                          padding: 15,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        titleFont: {
                          size: 13
                        },
                        bodyFont: {
                          size: 12
                        },
                        padding: 8
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Completion Rate</span>
                  <span>56%</span>
                </div>
                <div className="progress progress-thin">
                  <div className="progress-bar" style={{ width: '56%', backgroundColor: chartColors.primary }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="dashboard-card">
            <div className="card-header">
              <h5 className="dashboard-section-title mb-0">
                <i className="bi bi-list-check me-2"></i>Task Status Distribution
              </h5>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <Bar
                  data={taskCompletionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        titleFont: {
                          size: 13
                        },
                        bodyFont: {
                          size: 12
                        },
                        padding: 8
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        },
                        title: {
                          display: true,
                          text: 'Number of Tasks',
                          font: {
                            size: 12
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 11
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-3 small">
                <div className="row text-center">
                  <div className="col-3">
                    <div className="status-indicator" style={{ backgroundColor: chartColors.completed }}></div>
                    <div>Complete: 25</div>
                  </div>
                  <div className="col-3">
                    <div className="status-indicator" style={{ backgroundColor: chartColors.inProgress }}></div>
                    <div>In Progress: 15</div>
                  </div>
                  <div className="col-3">
                    <div className="status-indicator" style={{ backgroundColor: chartColors.review }}></div>
                    <div>Review: 5</div>
                  </div>
                  <div className="col-3">
                    <div className="status-indicator" style={{ backgroundColor: chartColors.todo }}></div>
                    <div>To Do: 10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Budget and Risk Statistics with modern styling */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="dashboard-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="dashboard-section-title mb-0">
                <i className="bi bi-cash-coin me-2"></i>Budget Allocation
              </h5>
              <span className="badge" style={{ backgroundColor: chartColors.primary }}>BHD 452K Total</span>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <Doughnut 
                  data={budgetAllocationData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 15,
                          padding: 15,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            let value = context.raw;
                            let percentage = context.parsed;
                            return `${context.label}: ${value}% (BHD ${Math.round(452 * value / 100)}K)`;
                          }
                        },
                        titleFont: {
                          size: 13
                        },
                        bodyFont: {
                          size: 12
                        },
                        padding: 8
                      }
                    },
                    cutout: '70%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="dashboard-card">
            <div className="card-header">
              <h5 className="dashboard-section-title mb-0">
                <i className="bi bi-shield-exclamation me-2"></i>Risk Analysis
              </h5>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <Pie
                  data={riskData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 15,
                          padding: 15,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        titleFont: {
                          size: 13
                        },
                        bodyFont: {
                          size: 12
                        },
                        padding: 8
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-1 small">
                  <span>Critical & High Risks</span>
                  <span className="badge" style={{ backgroundColor: chartColors.primary }}>9 Active</span>
                </div>
                <div className="progress progress-thin">
                  <div className="progress-bar" style={{ width: '31%', backgroundColor: chartColors.primary }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Projects Table with modern styling */}
      <div className="dashboard-card mb-4">
        <div className="card-header">
          <h5 className="dashboard-section-title mb-0">
            <i className="bi bi-graph-up-arrow me-2"></i>Top Projects by Budget Variance
          </h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table dashboard-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Budget (BHD)</th>
                  <th>Actual (BHD)</th>
                  <th>Variance</th>
                  <th>Completion</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hamad Twon Park (حديقة مدينة حمد)</td>
                  <td>94,340</td>
                  <td>79,245</td>
                  <td className="text-success">-15,095 (16% under)</td>
                  <td>
                    <div className="progress progress-thin">
                      <div className="progress-bar" style={{ width: '75%', backgroundColor: chartColors.completed }}></div>
                    </div>
                    <small>75%</small>
                  </td>
                  <td><span className="badge" style={{ backgroundColor: chartColors.completed }}>Under Budget</span></td>
                </tr>
                <tr>
                  <td>الحديقة البيئية- ECO WALK</td>
                  <td>66,038</td>
                  <td>67,925</td>
                  <td className="text-danger">+1,887 (2.9% over)</td>
                  <td>
                    <div className="progress progress-thin">
                      <div className="progress-bar" style={{ width: '65%', backgroundColor: chartColors.primary }}></div>
                    </div>
                    <small>65%</small>
                  </td>
                  <td><span className="badge" style={{ backgroundColor: chartColors.primary }}>Over Budget</span></td>
                </tr>
                <tr>
                  <td>Road Safety Improvements</td>
                  <td>113,208</td>
                  <td>110,377</td>
                  <td className="text-success">-2,831 (2.5% under)</td>
                  <td>
                    <div className="progress progress-thin">
                      <div className="progress-bar" style={{ width: '40%', backgroundColor: chartColors.tertiary }}></div>
                    </div>
                    <small>40%</small>
                  </td>
                  <td><span className="badge" style={{ backgroundColor: chartColors.tertiary }}>Under Budget</span></td>
                </tr>
                <tr>
                  <td>Salman City Park (حديقة مدينة سلمان)</td>
                  <td>75,472</td>
                  <td>75,660</td>
                  <td className="text-danger">+188 (0.25% over)</td>
                  <td>
                    <div className="progress progress-thin">
                      <div className="progress-bar" style={{ width: '25%', backgroundColor: chartColors.accent2 }}></div>
                    </div>
                    <small>25%</small>
                  </td>
                  <td><span className="badge" style={{ backgroundColor: chartColors.accent2 }}>At Risk</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Alert Cards and Notifications with modern styling */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="dashboard-card">
            <div className="card-header">
              <h5 className="dashboard-section-title mb-0">
                <i className="bi bi-bell me-2"></i>Recent Notifications
              </h5>
            </div>
            <div className="card-body">
              <div className="notification-item" style={{ borderLeftColor: chartColors.accent2 }}>
                <div className="d-flex">
                  <div className="me-2 flex-shrink-0">
                    <i className="bi bi-exclamation-triangle-fill" style={{ color: chartColors.accent2 }}></i>
                  </div>
                  <div>
                    <strong>Task "Tender Evaluation"</strong> deadline is approaching (3 days left).
                  </div>
                </div>
              </div>
              
              <div className="notification-item" style={{ borderLeftColor: chartColors.tertiary }}>
                <div className="d-flex">
                  <div className="me-2 flex-shrink-0">
                    <i className="bi bi-info-circle-fill" style={{ color: chartColors.tertiary }}></i>
                  </div>
                  <div>
                    <strong>New task "Financial Approval for Tender Award"</strong> has been assigned to you.
                  </div>
                </div>
              </div>
              
              <div className="notification-item" style={{ borderLeftColor: chartColors.completed }}>
                <div className="d-flex">
                  <div className="me-2 flex-shrink-0">
                    <i className="bi bi-check-circle-fill" style={{ color: chartColors.completed }}></i>
                  </div>
                  <div>
                    <strong>Milestone "Detailed Design"</strong> has been completed successfully.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="dashboard-card">
            <div className="card-header">
              <h5 className="dashboard-section-title mb-0">
                <i className="bi bi-calendar-check me-2"></i>Upcoming Tasks
              </h5>
            </div>
            <div className="card-body">
              <ul className="task-list">
                <li className="task-list-item">
                  <div>
                    <h6 className="mb-1">Financial Approval for Tender Award</h6>
                    <p className="text-muted small mb-0">Due: 12 Jan 2024</p>
                  </div>
                  <span className="badge" style={{ backgroundColor: `rgba(${hexToRgb(chartColors.accent2)}, 0.1)`, color: chartColors.accent2 }}>3 days left</span>
                </li>
                <li className="task-list-item">
                  <div>
                    <h6 className="mb-1">Tender Award</h6>
                    <p className="text-muted small mb-0">Due: 15 Jan 2024</p>
                  </div>
                  <span className="badge" style={{ backgroundColor: `rgba(${hexToRgb(chartColors.accent2)}, 0.1)`, color: chartColors.accent2 }}>6 days left</span>
                </li>
                <li className="task-list-item">
                  <div>
                    <h6 className="mb-1">Contract Commencement</h6>
                    <p className="text-muted small mb-0">Due: 30 Jan 2024</p>
                  </div>
                  <span className="badge" style={{ backgroundColor: `rgba(${hexToRgb(chartColors.tertiary)}, 0.1)`, color: chartColors.tertiary }}>21 days left</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert hex color to RGB for rgba usage
function hexToRgb(hex) {
  // Check for undefined/null input
  if (!hex) return '0, 0, 0'; // Return default RGB for undefined/null input
  
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export default Dashboard;
