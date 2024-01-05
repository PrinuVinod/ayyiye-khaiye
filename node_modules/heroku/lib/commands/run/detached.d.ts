import { Command } from '@heroku-cli/command-v9';
import '@oclif/core-v1/lib/parser';
export default class RunDetached extends Command {
    static description: string;
    static examples: string[];
    static strict: boolean;
    static flags: {
        app: import("@oclif/core-v1/lib/interfaces").OptionFlag<string>;
        remote: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        env: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        size: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
        tail: import("@oclif/core-v1/lib/interfaces").BooleanFlag<boolean>;
        type: import("@oclif/core-v1/lib/interfaces").OptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
