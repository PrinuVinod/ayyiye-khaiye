import { Command } from '@heroku-cli/command-v9';
import '@oclif/core-v1/lib/parser';
export default class RunInside extends Command {
    static description: string;
    static hidden: boolean;
    static examples: string[];
    static flags: {
        app: import("@oclif/core-v1/lib/interfaces").OptionFlag<string>;
        remote: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        'exit-code': import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
        env: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        listen: import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
    };
    static strict: boolean;
    run(): Promise<void>;
}
