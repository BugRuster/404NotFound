import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { githubService } from '../../services/github';
import { FileText, Users, GitBranch, Activity } from 'lucide-react';

const StatCard = ({ stat, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-black border border-white/10 overflow-hidden transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="p-5 group hover:bg-white/5 transition-all duration-300">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-300">
              <stat.icon className="h-6 w-6 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-white/70 truncate font-mono">
                {stat.name}
              </dt>
              <dd className="text-2xl font-bold text-white mt-1 font-mono">
                {stat.value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <li
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      }`}
    >
      <div className="px-4 py-4 sm:px-6 group hover:bg-white/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-all duration-300" />
            <p className="ml-2 text-sm font-medium text-white/70 group-hover:text-white truncate font-mono">
              {activity.title}
            </p>
          </div>
          <div className="ml-2 flex-shrink-0">
            <p className="px-2 py-1 text-xs font-semibold font-mono text-white/40 group-hover:text-white/70 border border-white/10 group-hover:border-white/20 transition-all duration-300">
              {activity.time}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

const Overview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = searchParams.get('github_token');
    if (token) {
      githubService.storeToken(token);
      navigate('/dashboard', { replace: true });
    }
    setIsLoaded(true);
  }, [searchParams, navigate]);

  const stats = [
    { name: 'TOTAL_DOCUMENTS', value: '12', icon: FileText },
    { name: 'TEAM_MEMBERS', value: '01', icon: Users },
    { name: 'CONNECTED_REPOS', value: '03', icon: GitBranch }
  ];

  const activities = [
    {
      id: 1,
      title: 'API Documentation updated',
      time: '2h ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'New repository connected',
      time: '4h ago',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Team member invited',
      time: '1d ago',
      status: 'completed'
    }
  ];

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-white font-mono">
          SYSTEM_DASHBOARD
          <span className="animate-pulse">_</span>
        </h1>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.name} stat={stat} delay={100 * (index + 1)} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-white/90 font-mono mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 animate-pulse" />
          RECENT_ACTIVITY
        </h2>
        <div className="border border-white/10 bg-black/50 backdrop-blur-sm">
          <ul role="list" className="divide-y divide-white/10">
            {activities.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;