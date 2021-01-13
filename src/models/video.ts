/* eslint-disable import/no-cycle */
import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';

import Channel from './channel';

@Entity()
export default class Video extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  thumbnail!: string;

  @Column()
  published!: Date;

  @Column()
  updated!: Date;

  @ManyToOne(() => Channel, (channel) => channel.videos)
  channel!: Channel;
}
