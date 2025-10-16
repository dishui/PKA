const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  timestamp?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getAuthToken();
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const config: RequestInit = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let data: any;
      if (isJson) {
        try {
          data = await response.json();
        } catch (jsonError) {
          // If JSON parsing fails, treat as text
          const text = await response.text();
          throw new Error(`Invalid JSON response: ${text}`);
        }
      } else {
        // If not JSON, get text content
        const text = await response.text();
        data = { error: text };
      }

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            window.location.href = '/auth/login';
          }
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }
    
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Dashboard endpoints
  async getDashboardMetrics() {
    return this.get('/dashboard/metrics');
  }

  async getWalletData(address: string) {
    return this.get(`/dashboard/wallet/${address}`);
  }

  async getTransactions(filter?: string, search?: string, limit?: number, offset?: number) {
    return this.get('/dashboard/transactions', { filter, search, limit, offset });
  }

  async getAgentExecutions() {
    return this.get('/dashboard/agent-executions');
  }

  // Risk assessment endpoints
  async getRiskAssessment() {
    return this.get('/risk/assessment');
  }

  async runNewRiskAssessment() {
    return this.post('/risk/assessment/run');
  }

  // Agent endpoints
  async getAgents() {
    return this.get('/agents');
  }

  async getAgent(id: string) {
    return this.get(`/agents/${id}`);
  }

  async createAgent(agentData: any) {
    return this.post('/agents', agentData);
  }

  async updateAgent(id: string, agentData: any) {
    return this.put(`/agents/${id}`, agentData);
  }

  async deleteAgent(id: string) {
    return this.delete(`/agents/${id}`);
  }

  async createAgentTask(agentId: string, taskData: any) {
    return this.post(`/agents/${agentId}/tasks`, taskData);
  }

  async getAgentTasks(agentId: string) {
    return this.get(`/agents/${agentId}/tasks`);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export types for convenience
export type { ApiResponse }; 