import { Component } from 'react';
import { VehicleService, Vehicle } from './services/vehiclesService.ts';
import styles from './App.module.css';

interface AppState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  page: number;
  searchQuery: string;
}

class App extends Component<object, AppState> {
  private vehicleService: VehicleService;

  constructor(props: object) {
    super(props);
    this.state = {
      vehicles: [],
      loading: false,
      error: null,
      page: 1,
      searchQuery: '',
    };

    this.vehicleService = new VehicleService();
  }

  componentDidMount() {
    this.loadVehicles();
  }

  loadVehicles = async () => {
    const { page, searchQuery } = this.state;
    this.setState({ loading: true, error: null });

    try {
      const data = await this.vehicleService.getVehicles(page, searchQuery);
      this.setState({ vehicles: data.results, loading: false });
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      this.setState({ error: message, loading: false });
    }
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, page: 1 }, this.loadVehicles);
  };

  render() {
    const { loading, error } = this.state;

    return (
      <div className={styles.appContainer}>
        <h1 className={styles.title}>Vehicle Explorer</h1>
        {loading && <p>Loading vehicles...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
}

export { App };
