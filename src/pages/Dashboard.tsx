import React, { useState } from 'react';
import { MapPin, Package, Calendar, TrendingUp, Truck as TruckIcon, AlertTriangle, DollarSign, Fuel, PenTool as Tool, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TruckData {
  id: string;
  location: string;
  destination: string;
  status: string;
  cargo: string;
  eta: string;
  driver: string;
  fuelCost: number;
  maintenance: string;
  completionPercentage: number;
}

interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  materialsRequired: string[];
  status: string;
  paymentStatus: string;
  value: number;
}

const initialTrucks: TruckData[] = [
  {
    id: "T001",
    location: "Mumbai",
    destination: "Delhi",
    status: "In Transit",
    cargo: "Construction Materials",
    eta: "2024-03-20",
    driver: "Rajesh Kumar",
    fuelCost: 45000,
    maintenance: "Due in 5 days",
    completionPercentage: 65
  },
  {
    id: "T002",
    location: "Bangalore",
    destination: "Hyderabad",
    status: "Loading",
    cargo: "Steel Beams",
    eta: "2024-03-19",
    driver: "Suresh Patel",
    fuelCost: 32000,
    maintenance: "Up to date",
    completionPercentage: 20
  },
  {
    id: "T003",
    location: "Chennai",
    destination: "Kolkata",
    status: "Scheduled",
    cargo: "Heavy Machinery",
    eta: "2024-03-21",
    driver: "Amit Singh",
    fuelCost: 52000,
    maintenance: "Overdue",
    completionPercentage: 0
  }
];

const initialProjects: Project[] = [
  {
    id: "P001",
    name: "Metro Extension Phase II",
    client: "Delhi Metro Corporation",
    location: "Delhi NCR",
    materialsRequired: ["Steel", "Concrete", "Electronics"],
    status: "Active",
    paymentStatus: "Paid",
    value: 2500000
  },
  {
    id: "P002",
    name: "Highway Expansion",
    client: "NHAI",
    location: "Maharashtra",
    materialsRequired: ["Asphalt", "Gravel", "Steel"],
    status: "Active",
    paymentStatus: "Pending",
    value: 1800000
  }
];

function Dashboard() {
  const [trucks] = useState<TruckData[]>(initialTrucks);
  const [projects] = useState<Project[]>(initialProjects);
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = {
    totalTrucks: 30,
    availableTrucks: 6,
    inUseTrucks: 24,
    utilizationRate: 80,
    onTimeDelivery: 95,
    pendingRequests: 8,
    totalRevenue: 4300000,
    pendingPayments: 1800000
  };

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <div>
            <p className="font-medium text-red-800">Critical Alerts</p>
            <ul className="mt-1 text-sm text-red-700">
              <li>• 3 overdue deliveries in Delhi region</li>
              <li>• Maintenance required for Truck T003</li>
              <li>• Payment overdue for Highway Expansion project</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Trucks Available</p>
              <p className="text-2xl font-bold">{stats.availableTrucks}/{stats.totalTrucks}</p>
              <p className="text-sm text-gray-500">Utilization: {stats.utilizationRate}%</p>
            </div>
            <TruckIcon className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Deliveries</p>
              <p className="text-2xl font-bold">{stats.inUseTrucks}</p>
              <p className="text-sm text-gray-500">{stats.pendingRequests} pending</p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">On-Time Rate</p>
              <p className="text-2xl font-bold">{stats.onTimeDelivery}%</p>
              <p className="text-sm text-green-500">↑ 2% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">₹{(stats.totalRevenue/100000).toFixed(1)}L</p>
              <p className="text-sm text-red-500">₹{(stats.pendingPayments/100000).toFixed(1)}L pending</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            {['overview', 'trucks', 'projects', 'maintenance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  selectedTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive Map View</p>
                <p className="text-sm text-gray-400">(Map integration to be implemented)</p>
              </div>

              {/* Active Projects */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Active Projects</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {project.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              project.paymentStatus === 'Paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {project.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'trucks' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Truck ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trucks.map((truck) => (
                      <tr key={truck.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{truck.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {truck.location} → {truck.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            truck.status === 'In Transit' ? 'bg-green-100 text-green-800' :
                            truck.status === 'Loading' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {truck.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truck.driver}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${truck.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{truck.completionPercentage}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            truck.maintenance === 'Up to date' ? 'bg-green-100 text-green-800' :
                            truck.maintenance === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {truck.maintenance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'projects' && (
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-gray-500">{project.client}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      project.paymentStatus === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {project.paymentStatus}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500">Required Materials:</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.materialsRequired.map((material, index) => (
                        <span
                          key={index}
                          className="bg-white px-2 py-1 text-xs font-medium text-gray-600 rounded-full border border-gray-200"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Value: ₹{(project.value/100000).toFixed(1)}L
                    </span>
                    <span className="text-gray-500">
                      Location: {project.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trucks.map((truck) => (
                  <div key={truck.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <TruckIcon className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{truck.id}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        truck.maintenance === 'Up to date' ? 'bg-green-100 text-green-800' :
                        truck.maintenance === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {truck.maintenance}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Last Service:</span>
                        <span>15 days ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Cost:</span>
                        <span>₹{truck.fuelCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Service:</span>
                        <span className={truck.maintenance === 'Overdue' ? 'text-red-600 font-medium' : ''}>
                          {truck.maintenance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;