const definition = {
  loading: false,
  name: 'sentences',
  keys: {
    singular: 'sentence',
    plural: 'sentences',
  },
  parent: 'story',
  payloadFormatter(sentence) {
    const { story_id, ... rest } = sentence;
    console.log({
      sentence: rest,
      story_id,
    });
    return {
      sentence: rest,
      story_id,
    };
  },
};

export default definition;
