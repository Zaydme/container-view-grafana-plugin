### Custom Grafana plugin: Container View

1. Install dependencies

   ```bash
   npm install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   npm run dev
   docker-compose up
   ```

3. Build plugin in production mode

   ```bash
   npm run build
   ```

### Setup

Example queries

`Container config query`

```sql
SELECT * FROM grafanademo.container_config LIMIT 1
```

`Product data query`

```sql
SELECT * FROM `product_data`
```

---

# Please make sure that "Container config query name" and "Product data query name" are same as the query name in the query editor.



Schema used during development

```sql
CREATE TABLE `container_config` (
	`Title` VARCHAR(128) NOT NULL DEFAULT 'Container Name',
	`OrderX` ENUM ('ASC', 'DESC') NOT NULL DEFAULT 'ASC',
   `OrderY` ENUM ('ASC', 'DESC') NOT NULL DEFAULT 'ASC',
   `Width` INT NOT NULL DEFAULT 7,
   `Height` INT NOT NULL DEFAULT 5,
   `Rotate` ENUM ('0', '90', '180', '270') NOT NULL DEFAULT '0',
);

CREATE TABLE `product_data` (
   `Key` VARCHAR(128) NOT NULL,
   `Value` INT,
   `Text` VARCHAR(128) NOT NULL,
   `X` INT NOT NULL,
   `Y` INT NOT NULL,
);
```