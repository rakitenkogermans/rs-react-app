import { Component } from 'react';
import styles from './Main.module.css';
import { Vehicle } from '../../services/vehiclesService.ts';
import { VehiclesList } from '../VehiclesList/VehiclesList.tsx';

interface MainProps {
  vehicles: Vehicle[];
}

class Main extends Component<MainProps> {
  render() {
    return (
      <div className={styles.mainContainer}>
        <VehiclesList vehicles={this.props.vehicles} />
      </div>
    );
  }
}

export { Main };
