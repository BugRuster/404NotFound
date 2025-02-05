// src/pages/dashboard/Documents.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { repositoryService } from '../../services/repository';
import { githubService } from '../../services/github';
import { Button } from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { FileText, GitBranch, Book } from 'lucide-react';

const Documents = () => {
 const [repositories, setRepositories] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
   fetchRepositories();
 }, []);

 const fetchRepositories = async () => {
   try {
     setIsLoading(true);
     const response = await repositoryService.getRepositories();
     setRepositories(response.data || []);
   } catch (err) {
     setError('Failed to fetch repositories. Please connect your GitHub account first.');
     console.error('Error fetching repositories:', err);
   } finally {
     setIsLoading(false);
   }
 };

 const handleConnectGitHub = () => {
   githubService.connectGithub();
 };

 if (isLoading) {
   return (
     <div className="flex justify-center items-center min-h-[400px]">
       <Loading size="lg" />
     </div>
   );
 }

 if (!repositories.length) {
   return (
     <div className="max-w-2xl mx-auto text-center p-12 bg-white rounded-lg shadow-sm">
       <GitBranch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
       <h3 className="text-lg font-medium text-gray-900">No Repositories Found</h3>
       <p className="mt-2 text-gray-500 mb-6">
         Connect your GitHub account to start generating documentation
       </p>
       <Button 
         onClick={handleConnectGitHub}
         className="flex items-center justify-center gap-2"
       >
         <GitBranch className="w-5 h-5" />
         Connect GitHub Account
       </Button>
     </div>
   );
 }

 return (
   <div className="space-y-6">
     <div className="flex justify-between items-center">
       <div>
         <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
         <p className="text-gray-600 mt-1">Manage documentation for your repositories</p>
       </div>
       <Button onClick={() => navigate('/dashboard/documents/new')}>
         Create New Doc
       </Button>
     </div>

     {error && (
       <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">
         {error}
       </div>
     )}

     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
       {repositories.map((repo) => (
         <div
           key={repo.id || repo._id}
           className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
         >
           <div className="p-6">
             <div className="flex items-center gap-2 mb-4">
               <Book className="w-5 h-5 text-indigo-600" />
               <h3 className="text-lg font-medium text-gray-900 truncate">
                 {repo.name}
               </h3>
             </div>
             
             <p className="text-gray-500 mb-4 line-clamp-2 min-h-[3rem]">
               {repo.description || 'No description available'}
             </p>

             <div className="flex items-center justify-between mt-4 pt-4 border-t">
               <div className="flex items-center text-sm text-gray-500">
                 <FileText className="w-4 h-4 mr-1" />
                 {repo.language || 'No language detected'}
               </div>
               <Button
                 variant="secondary"
                 size="sm"
                 onClick={() => navigate(`/dashboard/documents/${repo.id || repo._id}`)}
               >
                 View Docs
               </Button>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default Documents;