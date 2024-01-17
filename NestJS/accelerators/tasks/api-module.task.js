import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import { promisify } from 'util';
import Handlebars from 'handlebars';

const componentPath = '/src';
const templatePath = '/accelerators/templates';

const access = promisify(fs.access);
const copy = promisify(ncp);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearAndUpper(text) {
  return text.replace(/-/, '').toUpperCase();
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

async function copyTemplateFiles(options) {
  copy(options.templateDirectory, options.targetDirectory + '/' + options.template, {
    clobber: false,
  })
    .catch((er) => {



    })
    .then(async () => {
      for await (let f of getFiles(options.targetDirectory + '/' + options.template)) {

        if (!f.includes('.DS_Store')) {

          let readStream = fs.createReadStream(f, 'utf8');
          let data = '';
          readStream
            .on('data', function (chunk) {
              data += chunk;
            })
            .on('end', function () {
              // 
              // 
              var template = Handlebars.compile(data);

              var newValue = template({
                MODULE: capitalizeFirstLetter(options.template),
                module: (options.template + '').toLowerCase(),
              });
              newValue = newValue.replace('`-- FIRST LINE', '');
              newValue = newValue.replace('-- LAST LINE`;', '');

              fs.writeFileSync(f, newValue, 'utf8');

              // 
              // 
              const pattern = '$$MODULE$$';
              fs.rename(f, f.replace(pattern, options.template), function (err) {
                // if (err) 
                // if (!err) 
              });
            });
          // });
        }
      }
    });
}

async function createFolder(options) {
  try {
    if (!fs.existsSync(options.targetDirectory)) {
      fs.mkdirSync(options.targetDirectory);
    }
    if (!fs.existsSync(options.template)) {
      fs.mkdirSync(options.targetDirectory + `/${options.template}`);
    }
  } catch (error) {



    console.error('%s Duplicate Module Name', chalk.red.bold('ERROR'));
    process.exit(1);
  }
}

const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

// async function addStorybook(options) {
//   const { template, targetDirectory, prefix } = options;
//   const navigationName = prefix + toPascalCase(toPascalCase(capitalizeFirstLetter(template)));
//   fs.writeFile(
//     `${targetDirectory}/${template}/${navigationName}.stories.tsx`,
//     `${`import React from 'react';
// import {storiesOf} from '@storybook/react-native';
// import {View} from 'react-native';
// import ${navigationName} from './${navigationName}.component';

// storiesOf('${navigationName}', module)
//   .addDecorator(story => <View style={{padding: 10}}>{story()}</View>)
//   .add('${navigationName}', () => <${navigationName} />);
// `}`,
//     function (err) {
//       if (err) {
//         throw err;
//       }
//     },
//   );
// }

// async function addToIndex(options) {
//   const { targetDirectory, template, prefix } = options;
//   const moduleName = toPascalCase(capitalizeFirstLetter(template));

//   insertLine(`${targetDirectory}/index.ts`)
//     .prepend(`${`import ${prefix + moduleName} from './${template}/${prefix + moduleName}.component';`}`)
//     .then(function () {
//       const content = fs.readFileSync(`${targetDirectory}/index.ts`, 'utf8');
//       const newContent = content.replace('export {', `export {\n  ${prefix + moduleName},`);
//       fs.writeFile(`${targetDirectory}/index.ts`, newContent, function (err) {
//         if (err) {
//           throw err;
//         }
//       });
//     });
// }

async function createComponentFile(options) {
  const { template, targetDirectory, prefix } = options;
  const navigationName = prefix + toPascalCase(capitalizeFirstLetter(template));
  fs.writeFile(
    `${targetDirectory}/${template}/${navigationName}.component.tsx`,
    `${`import React from 'react';
    import {
      StyleProp,
      TextStyle,
      TouchableOpacity as CoreButton,
    } from 'react-native';
    import {Styles} from './${navigationName}.styles';
    import {XB_Text} from '@core-components/atoms';
    import {useTheme} from '@theme';
    
    interface ${navigationName}Props {
      title: string;
      buttonStyle?: any;
      textStyle?: StyleProp<TextStyle>;
      onPress: () => void;
      disabled?: boolean;
    }
    
    const ${navigationName} = (props: ${navigationName}Props) => {
      const {title, buttonStyle, textStyle, ...rest} = props;
      const {theme} = useTheme();
      return (
        <CoreButton
          style={[
            Styles.button,
            {backgroundColor: theme.palette.primaryButton},
            buttonStyle,
          ]}
          {...rest}
        >
          <XB_Text textStyle={textStyle}>{title}</XB_Text>
        </CoreButton>
      );
    };
    
    export default ${navigationName};
    `}`,
    function (err) {
      if (err) {
        throw err;
      }
    },
  );
}

// async function createStylesFile(options) {
//   const { template, targetDirectory, prefix } = options;
//   const navigationName = prefix + toPascalCase(capitalizeFirstLetter(template));
//   fs.writeFile(
//     `${targetDirectory}/${template}/${navigationName}.styles.ts`,
//     `${`import {StyleSheet} from 'react-native';
//         import {s, vs} from 'react-native-size-matters';
//         export const Styles = StyleSheet.create({
//         button: {
//           paddingVertical: vs(7),
//           borderRadius: 100,
//           alignItems: 'center',
//           paddingHorizontal: s(15),
//           marginVertical: vs(5),
//           alignItem: 'center',
//           justifyContent: 'center',
//         },
//       });
// `}`,
//     function (err) {
//       if (err) {
//         throw err;
//       }
//     },
//   );
// }

// async function createTestFile(options) {
//   const { template, targetDirectory, prefix } = options;
//   const navigationName = prefix + toPascalCase(capitalizeFirstLetter(template));
//   fs.writeFile(
//     `${targetDirectory}/${template}/${navigationName}.component.test.tsx`,
//     `${`import React from 'react';
// import {render} from '@core-utils';
// import ${prefix + toPascalCase(capitalizeFirstLetter(template))} from './${
//       prefix + toPascalCase(capitalizeFirstLetter(template))
//     }.component';

// it('${toPascalCase(capitalizeFirstLetter(template))} Component', () => {
// const component = render(
// <${prefix + toPascalCase(capitalizeFirstLetter(template))}
// />,
// );
// expect(component).toMatchSnapshot();
// });
// `}`,
//     function (err) {
//       if (err) {
//         throw err;
//       }
//     },
//   );
// }

export async function createComponent(options) {


  options = {
    ...options,
    targetDirectory: process.cwd() + `${componentPath}`,
    templateDirectory: process.cwd() + `${templatePath}`,
  };
  try {
    await access(options.templateDirectory, fs.constants.R_OK);
  } catch (error) {
    console.error('%s Invalid component name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: 'Creating Component folder',
        task: () => createFolder(options),
      },
      {
        title: 'Copy project files',
        task: () => copyTemplateFiles(options),
      },
      // {
      //   title: 'Generating Component file',
      //   task: () => createComponentFile(options),
      // },
      // {
      //   title: 'Adding to Index ',
      //   task: () => addToIndex(options),
      // },
      // {
      //   title: 'Adding Storybook ',
      //   task: () => addStorybook(options),
      // },
      // {
      //   title: 'Generating Styles file',
      //   task: () => createStylesFile(options),
      // },
      // {
      //   title: 'Generating Test file',
      //   task: () => createTestFile(options),
      // },
    ],
    {
      exitOnError: false,
    },
  );

  await tasks.run();
  return true;
}
