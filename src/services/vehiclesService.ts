export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface VehicleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehicle[];
}

class VehicleService {
  private BASE_URL = 'https://swapi.dev/api/vehicles/';

  getVehicles = async (
    page: number = 1,
    search: string = ''
  ): Promise<VehicleResponse> => {
    const params = new URLSearchParams({ page: page.toString() });
    if (search) params.append('search', search);

    const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: VehicleResponse = await response.json();
    return data;
  };
}

export { VehicleService };
