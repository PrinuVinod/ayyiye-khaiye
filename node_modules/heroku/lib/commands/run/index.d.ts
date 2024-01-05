import { Command } from '@heroku-cli/command-v9';
import '@oclif/core-v1/lib/parser';
export default class Run extends Command {
    static description: string;
    static examples: string[];
    static strict: boolean;
    static flags: {
        app: import("@oclif/core-v1/lib/interfaces").OptionFlag<string>;
        remote: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        size: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        type: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        'exit-code': import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
        env: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        'no-tty': import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
        listen: import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
        'no-notify': import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
