/* eslint-disable import/no-cycle */
import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from 'typeorm';

import Video from './video';

@Entity()
export default class Channel extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Video, (video) => video.channel)
  videos!: Video[];
}
