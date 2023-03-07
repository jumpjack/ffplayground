function parseFfmpegCommand(rawCommand) {
  const sanitizedInput = sanitizeInput(rawCommand);

  if (!sanitizedInput) {
    throw new Error("Invalid command");
  }

  const rawOptions = sanitizedInput.replace("ffmpeg", "");

  let parsedOptions = [];
  let currentOption = [];
  for (let index = 0; index < rawOptions.length; index++) {
    const val = rawOptions[index];

    // -i input.mp4 -ss 00:00:03 -vframes 1 -q:v 2 output.jpg
    if (val === " ") {
      if (currentOption.length > 0) {
        parsedOptions.push(currentOption.join(""));
        currentOption = [];
      }
      continue;
    } else {
      currentOption.push(val);
      if (index === rawOptions.length - 1) {
        parsedOptions.push(currentOption.join(""));
        currentOption = [];
      }
    }
  }
  return parsedOptions;
}

const sanitizeInput = (input) => {
  return input.trim();
};

export { parseFfmpegCommand };
