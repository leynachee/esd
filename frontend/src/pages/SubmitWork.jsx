import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  Calendar,
  User,
  Paperclip,
  Send
} from 'lucide-react';
import { getContractById } from '../constants/mockData';

const SubmitWork = () => {
  const { contractId, phaseId } = useParams();
  const navigate = useNavigate();
  
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const contract = getContractById(parseInt(contractId));
  const phase = contract?.phases.find(p => p.id === phaseId);

  // Mock: In real app, determine from auth
  const currentUserRole = 'freelancer';

  if (!contract || !phase) {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Phase Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gold-300 hover:text-gold-200"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Check if user is authorized (freelancer only)
  if (currentUserRole !== 'freelancer') {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-4">Only the freelancer can submit work.</p>
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            className="text-gold-300 hover:text-gold-200"
          >
            Back to Contract
          </button>
        </div>
      </div>
    );
  }

  // Check if phase is in correct status
  if (phase.status !== 'in_progress') {
    return (
      <div className="min-h-screen bg-dark-200 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Cannot Submit</h2>
          <p className="text-gray-400 mb-4">
            This phase is currently: <span className="text-yellow-300 font-medium capitalize">{phase.status.replace('_', ' ')}</span>
          </p>
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            className="text-gold-300 hover:text-gold-200"
          >
            Back to Contract
          </button>
        </div>
      </div>
    );
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload at least one file');
      return;
    }

    if (!notes.trim()) {
      if (!confirm('No notes added. Continue anyway?')) {
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate file upload and submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // In real app, this would be an API call
      // For now, just navigate back with success message
      alert(`Successfully submitted Phase ${phase.number}: ${phase.title}\n\nFiles: ${files.length}\nNotes: ${notes.substring(0, 50)}...`);
      
      navigate(`/contracts/${contractId}`);
    }, 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-dark-200 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Contract</span>
          </button>

          {/* Page Title */}
          <div className="bg-dark-100 rounded-lg border border-dark-50 p-6">
            <div className="flex items-start gap-4">
              {/* Phase Number */}
              <div className="shrink-0 w-12 h-12 rounded-full bg-gold-300 text-dark-200 flex items-center justify-center font-bold text-xl">
                {phase.number}
              </div>

              {/* Phase Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-100 mb-2">
                  Submit Deliverables: {phase.title}
                </h1>
                <p className="text-gray-400 mb-4">{phase.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4 text-gold-300" />
                    <span>Client: {contract.client.name}</span>
                  </div>
                  {phase.deadline && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-gold-300" />
                      <span>Deadline: {formatDate(phase.deadline)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Deliverables */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gold-300" />
            Expected Deliverables
          </h3>
          <ul className="space-y-2">
            {phase.deliverables.map((deliverable, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-300 mt-2 shrink-0"></div>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* File Upload Section */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-gold-300" />
            Upload Files
          </h3>

          {/* Drag & Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive
                ? 'border-gold-300 bg-gold-300/10'
                : 'border-dark-50 hover:border-gold-300/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
            
            <Upload className={`w-12 h-12 mx-auto mb-4 ${
              dragActive ? 'text-gold-300' : 'text-gray-500'
            }`} />
            
            <p className="text-gray-300 mb-2">
              Drag and drop files here, or{' '}
              <label
                htmlFor="file-upload"
                className="text-gold-300 hover:text-gold-200 cursor-pointer font-medium"
              >
                browse
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Supports: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, ZIP (Max 50MB per file)
            </p>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                Uploaded Files ({files.length})
              </h4>
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-dark-200 rounded-lg border border-dark-50 hover:border-gold-300/30 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-gold-300 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-200 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="bg-dark-100 rounded-lg border border-dark-50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-300" />
            Notes for Client
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes, instructions, or context about your deliverables here..."
            rows={6}
            className="w-full px-4 py-3 bg-dark-200 border border-dark-50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-300/50 resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            {notes.length} characters
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-400">
              <p className="font-medium text-blue-300 mb-1">Auto-Approval Policy</p>
              <p>
                Once submitted, the client has <span className="text-blue-300 font-medium">5 days (120 hours)</span> to review your work.
                If they don't respond within 5 days, your work will be <span className="text-blue-300 font-medium">automatically approved</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(`/contracts/${contractId}`)}
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 border border-dark-50 text-gray-300 rounded-lg hover:border-gold-300/50 hover:bg-dark-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || files.length === 0}
            className="flex-1 px-6 py-4 bg-gold-300 text-dark-200 rounded-lg hover:bg-gold-200 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit for Review
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? <button className="text-gold-300 hover:text-gold-200">Contact Support</button>
        </p>
      </div>
    </div>
  );
};

export default SubmitWork;