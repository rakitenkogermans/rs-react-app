import { Component } from 'react';
import styles from './VehiclesList.module.css';
import { Vehicle } from '../../services/vehiclesService.ts';
import { VehicleItem } from '../VehicleItem/VehicleItem.tsx';

interface VehiclesListProps {
  vehicles: Vehicle[];
}

class VehiclesList extends Component<VehiclesListProps> {
  render() {
    const { vehicles } = this.props;
    return (
      <ul className={styles.listContainer}>
        {vehicles.length === 0 ? (
          <h2>Vehicles not found.</h2>
        ) : (
          vehicles.map((vehicle) => (
            <VehicleItem key={vehicle.url} vehicle={vehicle} />
          ))
        )}
      </ul>
    );
  }
}

export { VehiclesList };
