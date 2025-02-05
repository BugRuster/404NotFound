// src/pages/dashboard/Overview.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { githubService } from '../../services/github';
import { FileText, Users, GitBranch } from 'lucide-react'; // Import icons you need

const Overview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Define stats array
  const stats = [
    {
      name: 'Total Documents',
      value: '12',
      icon: FileText
    },
    {
      name: 'Team Members',
      value: '4',
      icon: Users
    },
    {
      name: 'Connected Repos',
      value: '3',
      icon: GitBranch
    }
  ];

  useEffect(() => {
    const token = searchParams.get('github_token');
    if (token) {
      githubService.storeToken(token);
      navigate('/dashboard', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 className="text-lg font-medium text-gray-900 mt-8 mb-4">
        Recent Activity
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            {
              id: 1,
              title: 'API Documentation updated',
              time: '2 hours ago',
              status: 'completed'
            },
            {
              id: 2,
              title: 'New repository connected',
              time: '4 hours ago',
              status: 'completed'
            },
            {
              id: 3,
              title: 'Team member invited',
              time: '1 day ago',
              status: 'completed'
            }
          ].map((activity) => (
            <li key={activity.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {activity.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;