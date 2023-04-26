/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
// const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const { Buffer } = require('buffer');
const catchAsync = require('../utils/catchAsync');
const formatSize = require('../utils/formatSize');

const download = catchAsync(async (req, res) => {
  const { link, quality } = req.query;

  const videoID = ytdl.getURLVideoID(link);
  // Download video using ytdl-core
  const video = ytdl(link, { quality });
  const info = await ytdl.getInfo(videoID);
  const videoSize = info.formats[0].contentLength;
  const responseFormat = {
    ...info.videoDetails,
    videoLength: formatSize(videoSize),
  };
  const encodedData = Buffer.from(JSON.stringify(responseFormat)).toString('base64');

  res.set({
    'Content-Type': 'video/mp4',
    'X-Additional-Data': encodedData,
  });

  video.pipe(res);
});

module.exports = {
  download,
};
