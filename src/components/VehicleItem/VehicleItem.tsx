import { Component } from 'react';
import styles from './VehicleItem.module.css';
import { Vehicle } from '../../services/vehiclesService.ts';

interface VehicleItemProps {
  vehicle: Vehicle;
}

class VehicleItem extends Component<VehicleItemProps> {
  render() {
    const { vehicle } = this.props;
    return (
      <li className={styles.vehicleItem}>
        <h3>{vehicle.name}</h3>
        <p>
          <strong>Model:</strong> {vehicle.model}
        </p>
        <p>
          <strong>Manufacturer:</strong> {vehicle.manufacturer}
        </p>
        <p>
          <strong>Cost:</strong> {vehicle.cost_in_credits} credits
        </p>
      </li>
    );
  }
}

export { VehicleItem };
