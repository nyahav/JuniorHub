export interface Database {
    public: {
      Tables: {
        jobs: {
          Row: {
            id: string;
            created_at: string;
            company: string;
            position: string;
            stage: string;
            link: string | null;
            notes: string | null;
            user_id: string;
          };
          Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at'>;
          Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
        };
      };
    };
  }