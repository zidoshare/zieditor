declare namespace zimarked {
  interface State {
    src: string;
    env: Object;
    options: Object;
    tokens: Object[];
    inlineMode: boolean;
    inline: Object;
    block: Object;
    renderer: Object;
    typographer: Object;
  }
}