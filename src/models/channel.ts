/* eslint-disable import/no-cycle */
import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from 'typeorm';

import Video from './video';

export type ChannelId = string;

@Entity()
export default class Channel extends BaseEntity {
  @PrimaryColumn()
  id!: ChannelId;

  @Column()
  name!: string;

  @OneToMany(() => Video, (video) => video.channel)
  videos!: Video[];
}
