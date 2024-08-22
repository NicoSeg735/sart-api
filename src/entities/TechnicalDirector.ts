import { ChildEntity } from 'typeorm'

import { Employee } from './Employee'

@ChildEntity()
export class TechnicalDirector extends Employee {}
