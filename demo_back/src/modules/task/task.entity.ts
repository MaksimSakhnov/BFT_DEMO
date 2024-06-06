import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @Column({ name: 'status', type: 'boolean', nullable: false })
  status: boolean;

  @Column({ name: 'lat', type: 'float8', nullable: false })
  lat: string;

  @Column({ name: 'lng', type: 'float8', nullable: false })
  lng: string;
}
