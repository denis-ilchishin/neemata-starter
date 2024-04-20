import { Module } from '@neematajs/application'
import { uploadFinishEvent } from './events.ts'
import complex from './procedures/complex.ts'
import simple from './procedures/simple.ts'
import streamBinary from './procedures/stream-binary.ts'
import streamJson from './procedures/stream-json.ts'
import task from './procedures/task.ts'
import upload from './procedures/upload.ts'

export const exampleModule = new Module()
  .withProcedures({
    complex,
    simple,
    streamBinary,
    streamJson,
    task,
    upload,
  })
  .withEvents({
    finish: uploadFinishEvent,
  })
