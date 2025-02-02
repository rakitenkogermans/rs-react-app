import { Component } from 'react';
import { VehicleService, Vehicle } from './services/vehiclesService.ts';
import styles from './App.module.css';
import { Search } from './components/Search/Search.tsx';
import { Main } from './components/Main/Main.tsx';
import { LOCAL_STORAGE_KEYS } from './constants/localStorage/localStorage.ts';
import { Loader } from './components/Loader/Loader.tsx';

interface AppState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  page: number;
  searchQuery: string;
  initialized: boolean;
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
      searchQuery: localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY) || '',
      initialized: false,
    };

    this.vehicleService = new VehicleService();
  }

  componentDidMount() {
    this.loadVehicles();
  }

  loadVehicles = async () => {
    const { page, searchQuery, initialized } = this.state;
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
    } finally {
      if (!initialized) {
        this.setState({ initialized: true });
      }
    }
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, page: 1 }, this.loadVehicles);
  };

  render() {
    const { vehicles, loading, error, initialized, searchQuery } = this.state;

    return (
      <div className={styles.appContainer}>
        <h1 className={styles.title}>Vehicle Explorer</h1>
        <Search onSearch={this.handleSearch} initialQuery={searchQuery} />
        {loading && <Loader />}
        {error && <p className={styles.error}>{error}</p>}
        {initialized && <Main vehicles={vehicles} />}
      </div>
    );
  }
}

export { App };
