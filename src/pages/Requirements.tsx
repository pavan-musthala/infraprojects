import React, { useState } from 'react';
import { Calendar, MapPin, Package, AlertCircle, TrendingUp, Truck, Building2, FileSpreadsheet } from 'lucide-react';

interface MaterialRequirement {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Fulfilled';
  priority: 'High' | 'Medium' | 'Low';
}

interface UpcomingProject {
  id: string;
  name: string;
  location: string;
  startDate: string;
  duration: string;
  client: string;
  budget: number;
  requirements: MaterialRequirement[];
  status: 'Planning' | 'Approved' | 'On Hold';
  description: string;
}

const initialProjects: UpcomingProject[] = [
  {
    id: 'UP001',
    name: 'Smart City Infrastructure Development',
    location: 'Pune, Maharashtra',
    startDate: '2024-04-15',
    duration: '18 months',
    client: 'Pune Municipal Corporation',
    budget: 85000000,
    status: 'Approved',
    description: 'Development of smart city infrastructure including IoT-enabled traffic management systems and smart utility networks.',
    requirements: [
      {
        id: 'M001',
        name: 'Steel Reinforcement Bars',
        quantity: 5000,
        unit: 'tonnes',
        deadline: '2024-04-10',
        status: 'Pending',
        priority: 'High'
      },
      {
        id: 'M002',
        name: 'Fiber Optic Cables',
        quantity: 2500,
        unit: 'km',
        deadline: '2024-04-20',
        status: 'In Progress',
        priority: 'Medium'
      }
    ]
  },
  {
    id: 'UP002',
    name: 'Railway Station Modernization',
    location: 'Chennai, Tamil Nadu',
    startDate: '2024-05-01',
    duration: '12 months',
    client: 'Southern Railways',
    budget: 65000000,
    status: 'Planning',
    description: 'Complete modernization of Chennai Central railway station including platform upgrades and passenger amenities.',
    requirements: [
      {
        id: 'M003',
        name: 'Structural Steel',
        quantity: 3000,
        unit: 'tonnes',
        deadline: '2024-04-25',
        status: 'Pending',
        priority: 'High'
      },
      {
        id: 'M004',
        name: 'Precast Concrete Panels',
        quantity: 1500,
        unit: 'pieces',
        deadline: '2024-04-30',
        status: 'Pending',
        priority: 'Medium'
      }
    ]
  },
  {
    id: 'UP003',
    name: 'Green Energy Industrial Park',
    location: 'Gujarat',
    startDate: '2024-06-01',
    duration: '24 months',
    client: 'Gujarat Industrial Development Corporation',
    budget: 120000000,
    status: 'Approved',
    description: 'Development of a sustainable industrial park with solar power integration and waste management systems.',
    requirements: [
      {
        id: 'M005',
        name: 'Solar Panels',
        quantity: 10000,
        unit: 'pieces',
        deadline: '2024-05-15',
        status: 'In Progress',
        priority: 'High'
      },
      {
        id: 'M006',
        name: 'Industrial Grade Cables',
        quantity: 5000,
        unit: 'km',
        deadline: '2024-05-20',
        status: 'Pending',
        priority: 'Medium'
      }
    ]
  }
];

function Requirements() {
  const [projects] = useState<UpcomingProject[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<UpcomingProject | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Fulfilled':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Requirements</h1>
          <p className="text-gray-500">Manage and track upcoming project requirements</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md ${
              view === 'list'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-md ${
              view === 'calendar'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Requirements</p>
              <p className="text-2xl font-bold">
                {projects.reduce((acc, project) => 
                  acc + project.requirements.filter(req => req.status === 'Pending').length, 0
                )}
              </p>
            </div>
            <Package className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">In Progress</p>
              <p className="text-2xl font-bold">
                {projects.reduce((acc, project) => 
                  acc + project.requirements.filter(req => req.status === 'In Progress').length, 0
                )}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold">
                ₹{(projects.reduce((acc, project) => acc + project.budget, 0) / 10000000).toFixed(1)}Cr
              </p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          {projects.map((project) => (
            <div key={project.id} className="mb-6 last:mb-0">
              <div className="border rounded-lg p-6">
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        Starts: {project.startDate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Project Details */}
                <div className="mb-4">
                  <p className="text-gray-600">{project.description}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Duration: {project.duration}</span>
                    <span>Budget: ₹{(project.budget / 10000000).toFixed(1)}Cr</span>
                    <span>Client: {project.client}</span>
                  </div>
                </div>

                {/* Requirements Table */}
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-700 mb-2">Material Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {project.requirements.map((requirement) => (
                          <tr key={requirement.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {requirement.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {requirement.quantity} {requirement.unit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {requirement.deadline}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(requirement.status)}`}>
                                {requirement.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(requirement.priority)}`}>
                                {requirement.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Requirements;